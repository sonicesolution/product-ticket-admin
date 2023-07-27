"use client";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs/CustomBreadcrumbs";
import { DataTable } from "@/components/dataTable";
import Iconify from "@/components/iconify/Iconify";
import { PATH_DASHBOARD } from "@/routes/paths";
import { Button, Container, Tooltip } from "@mui/material";
import React from "react";
import NextLink from "next/link";
import { ContainerComponent } from "@/components/container";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import moment from "moment";

const ProductsList = () => {
  const { push } = useRouter();
  const title = "Products";
  const formUrl = `${PATH_DASHBOARD.product.products}/form`;
  const actionUrl = "admin/catalog/products";
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
      field: "company_id",
      headerName: "Company",
      width: 140,
      renderCell: ({ row }) => {
        return row?.product?.name;
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: "200",
    },
    {
      field: "code",
      headerName: "Code",
      width: "200",
    },
    {
      field: "model",
      headerName: "Models",
      width: "200",
    },
    {
      field: "warranty_start",
      headerName: "Warranty Date",
      type: "any",
      width: 200,
      renderCell: ({ row }) => {
        return moment(row?.created_at, "DD-MM-YYYY").format("DD-MM-YYYY");
      },
    },
    {
      field: "warranty_end",
      headerName: "Warranty End Date",
      type: "any",
      width: 200,
      renderCell: ({ row }) => {
        return moment(row?.created_at, "DD-MM-YYYY").format("DD-MM-YYYY");
      },
    },
    {
      field: "details",
      headerName: "Details",
      width: "200",
    },
  ];
  return (
    <>
      <ContainerComponent>
        <CustomBreadcrumbs
          heading="Product List"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.app,
            },
            {
              name: "Products",
              // href: "#",
            },
            {
              name: "List",
            },
          ]}
          action={
            <Button
              component={NextLink}
              href={`${formUrl}/new`}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Product
            </Button>
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
        />
      </ContainerComponent>
    </>
  );
};

export default ProductsList;