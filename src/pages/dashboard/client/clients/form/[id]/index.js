"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import ClientFormSection from "@/sections/dashboard/client/clientForm/clientForm";
import axiosInstance from "@/utils/axios";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";

const CompanyEmployeesPageForm = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = router.query;
  const title = "Client Form";
  const backUrl = `${PATH_DASHBOARD.client.clients}`;
  const actionUrl = "admin/user/users";

  const formik = useFormik({
    initialValues: {
      phone: "",
      name: "",
      email: "",
      address: "",
      user_type: process.env.NEXT_PUBLIC_CLIENT_TYPE,
      password: "",
      is_active: true,
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Name is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      const phoneRegex = /^\d+$/i;
      if (!values.phone) {
        errors.phone = "Phone is required";
      } else if (!phoneRegex.test(values.phone)) {
        errors.phone = "Invalid phone number";
      } else if (values.phone.length < 10 || values.phone.length > 10) {
        errors.phone = "Phone number must be 10 digit";
      }

      if (id === "new") {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (!values.password) {
          errors.password = "Password is required";
        } else if (values.password.length > 10) {
          errors.password = "Password must be less than 10 characters";
        } else if (!passwordRegex.test(values.password)) {
          errors.password =
            "Must Contain 10 Characters, One Uppercase, One Lowercase, One Number and one special case Character";
        }
      }
      return errors;
    },
    onSubmit: async (values) => {
      let method = "POST";
      let url = actionUrl;
      if (id != "new") {
        method = "PUT";
        url = `${actionUrl}/${id}`;
      }

      await axiosInstance
        .request({
          method: method,
          url: url,
          data: values,
        })
        .then((response) => {
          if (response.status === 200) {
            router.back();
            enqueueSnackbar(response.data.message, {
              variant: "success",
            });
          }
        })
        .catch((error) => {
          const { response } = error;
          // show error message
          enqueueSnackbar(response?.data?.message, {
            variant: "error",
          });

          // set server error
          if (response.status === 422) {
            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(values)) {
              if (response.data.errors[key]) {
                formik.setFieldError(key, response.data.errors[key][0]);
                // setErrors({ [key]: response.data.errors[key][0] });
              }
            }
          }
        });
    },
  });

  const bindData = async (id) => {
    await axiosInstance.get(`${actionUrl}/${id}`).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        // bind form data from server
        for (const [key] of Object.entries(formik.values)) {
          if (data[key]) {
            formik.setFieldValue([key], data[key]);
          } else {
            formik.setFieldError(key, "");
          }
        }
      }
    });
  };

  React.useEffect(() => {
    if (id && id !== "new") {
      bindData(id);
    }
  }, [id]);

  return (
    <ContainerComponent>
      <CustomBreadcrumbs
        heading={title}
        links={[
          {
            name: "Dashboard",
            href: PATH_DASHBOARD.app,
          },
          {
            name: "Clients",
            href: backUrl,
          },
          { name: title },
        ]}
      />
      <form noValidate onSubmit={formik.handleSubmit}>
        <ClientFormSection formik={formik} id={id} />
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={formik?.isSubmitting}
          >
            {id === "new" ? "Create client" : "Update client"}
          </LoadingButton>
        </Stack>
      </form>
    </ContainerComponent>
  );
};
CompanyEmployeesPageForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CompanyEmployeesPageForm;
