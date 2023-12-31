"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import useCompany from "@/hooks/useCompany";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import CompanyFormSection from "@/sections/dashboard/company/companies/companyForm";
import { UserFormSection } from "@/sections/dashboard/admin/admin";
import axiosInstance from "@/utils/axios";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";

const CompanyPageForm = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { getCompanies } = useCompany();
  const { id } = router.query;
  const title = "Company Form";
  const backUrl = `${PATH_DASHBOARD.company.companies}`;
  const actionUrl = "admin/company/companies";

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
      code: "",
      is_active: true,
      logo:"",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Company Name is required";
      }
      if (!values.code) {
        errors.code = "Company Code is required";
      }

      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      const phoneRegex = /^\d+$/i;
      if (!values.phone_number) {
        errors.phone_number = "Phone is required";
      } else if (!phoneRegex.test(values.phone_number)) {
        errors.phone_number = "Invalid phone_number number";
      } else if (
        values.phone_number.length < 10 ||
        values.phone_number.length > 10
      ) {
        errors.phone_number = "Phone number must be 10 digit";
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
            getCompanies();
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

  const generateCode = async () => {
    await axiosInstance
      .get("admin/catalog/generate-auto-code")
      .then((response) => {
        if (response.status === 200) {
          formik.setFieldValue("code", response?.data?.code);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            name: "Company",
            href: backUrl,
          },
          { name: title },
        ]}
      />
      <form noValidate onSubmit={formik.handleSubmit}>
        <CompanyFormSection
          formik={formik}
          id={id}
          generateCode={generateCode}
        />
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={formik?.isSubmitting}
          >
            {id === "new" ? "Create Company" : "Update Company"}
          </LoadingButton>
        </Stack>
      </form>
    </ContainerComponent>
  );
};
CompanyPageForm.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CompanyPageForm;
