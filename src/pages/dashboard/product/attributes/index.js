"use client";
import { ContainerComponent } from "@/components/container";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import Iconify from "@/components/iconify/Iconify";
import Label from "@/components/label";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { AddFormButton } from "@/module/auth/addFormButton";
import { PATH_DASHBOARD } from "@/routes/paths";
import { Button, Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import NextLink from "next/link";
import { useRouter } from "next/router";
// import Head from "next/document";

const CompanyEmployeesList = () => {
  const { push } = useRouter();
  const title = "Product Attribute";
  const formUrl = `${PATH_DASHBOARD.product.attributes}/form`;
  const actionUrl = "admin/attribute/attributes";
  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: "200",
      getActions: (params) => [
        <GridActionsCellItem
          key="viewAction"
          icon={
            <Tooltip title="Edit">
              <Iconify icon="circum:edit" width={25} />
            </Tooltip>
          }
          label="Edit"
          onClick={() => push(`${formUrl}/${params.id}`)}
        />,
      ],
    },
    {
      field: "name",
      headerName: "Attribute Name",
      width: "200",
      isfilter: false,
      disableColumnFilter: true,
    },
    // {
    //   field: "company_id",
    //   headerName: "Company Name",
    //   width: "200",
    // },
    {
      field: "is_active",
      headerName: "Is Active",
      width: 140,
      renderCell: ({ row }) => {
        if (row.is_active) {
          return <Label color="primary">Active</Label>;
        } else {
          return <Label color="error">InActive</Label>;
        }
      },
    },
  ];

  return (
    <>
      {/* <Head>
      <title>
        login
      </title>
    </Head> */}
      <ContainerComponent>
        <CustomBreadcrumbs
          heading="Product Attribute List"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.app,
            },
            {
              name: "Product Attribute",
              // href: "#",
            },
            {
              name: "List",
            },
          ]}
          action={
            <AddFormButton
              title="New Product Attribute"
              url={`${formUrl}/new`}
            />
          }
        />

        <DataTable
          title={title}
          actionUrl={actionUrl}
          defaultSortModel={[{ field: "updated_at", sort: "desc" }]}
          defaultFilterModel={{
            items: [],
          }}
          columns={columns}
          checkboxSelection={true}
          disableRowSelectionOnClick={true}
        />
      </ContainerComponent>
    </>
  );
};
CompanyEmployeesList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CompanyEmployeesList;
