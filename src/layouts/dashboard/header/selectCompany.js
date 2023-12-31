import React from "react";
import { SelectMuiAutocomplete } from "@/components/form";
import { useAuthContext } from "@/auth/useAuthContext";
import SelectAutocomplete from "@/components/form/selectAutocomplete";
import useCompany from "@/hooks/useCompany";
import axiosInstance from "@/utils/axios";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { find } from "lodash";

const NotAllowD = [
  "form",
  "qr_setting",
  "company_settings",
  "promo_code",
  "blog",
  "company_statuses",
  "catalog",
  "user_statuses",
  "detail",
  "history",
];

const isShowDropdown = [
  "/dashboard/company/companies",
  "/dashboard/company/companies/form/[id]",
  "/dashboard/company/companies/form/new",
  "/dashboard/profile/my_profile",
];
const AllowD = [];

const isShowData = ["/dashboard/tag/tag_scan"];

const NotAllow = () => {
  const url = typeof window != "undefined" && window.location.href;
  const getD = url && url?.split("/");
  const found =
    getD && getD?.length > 0 && getD.some((r) => NotAllowD.indexOf(r) >= 0);
  return found;
};

console.log("NotAllow", NotAllow());

const Allow = () => {
  const url = typeof window != "undefined" && window.location.href;
  const getD = url?.split("/");
  const found = getD.some((r) => AllowD.indexOf(r) >= 0);
  return found;
};

const isShow = (path) => {
  let show = false;
  show = isShowData.includes(path);

  return show;
};

const SelectCompany = () => {
  const { user } = useAuthContext();
  const { pathname } = useRouter();
  const {
    companyId,
    setCompany,
    setCompanyDetail,
    companyDetail,
    getCompanies,
    companies,
  } = useCompany();

  const isShowCompanyDropdown = () => {
    let isShow = isShowDropdown.includes(pathname);
    return isShow;
  };

  React.useEffect(() => {
    getCompanies();
  }, []);

  //After Login Default company Set
  React.useEffect(() => {
    if (user && !companyId) {
      const company_id =
        JSON.parse(window.localStorage.getItem("companyId")) ||
        user?.company_id;
      axiosInstance.defaults.headers.common.company_id = company_id;
      axiosInstance.defaults.headers.common.platform = "frontend";
      setCompany(company_id);
    }
  }, [user]);

  React.useEffect(() => {
    if (user && user?.company_id && !companyDetail) {
      const company_id =
        JSON.parse(window.localStorage.getItem("companyId")) ||
        user?.company_id;
      let findCompanyDetail;
      if (companies?.length > 0) {
        findCompanyDetail = find(companies, { id: Number(company_id) }) || "";
        console.log("findCompanyDetail", findCompanyDetail);

        setCompanyDetail(findCompanyDetail);
      } else {
        findCompanyDetail = {
          label: user?.company?.name,
          value: user?.company_id,
          ...user?.company,
        };
        setCompanyDetail(findCompanyDetail);
      }
    }
  }, [user, user?.company_id]);

  console.log("companyDetail", companyDetail);

  return (
    <Box component="div" sx={{ flexGrow: 1 }}>
      {/* {!isShowCompanyDropdown() && (
        <SelectAutocomplete
          fullWidth
          name={`company_id`}
          label="Company"
          disabled={!Allow() && NotAllow()} //we should (not allow/allow) company change in Add/Edit
          placeholder="Select Company"
          value={companyId}
          options={companies || []}
          // loading={isUserCompanyLoading}
          getOptionLabel="name"
          getOptionValue="id"
          disableClearable
          onChange={(e) => {
            if (e) {
              setCompany(e);
              let findCompany = find(companies, { id: Number(e) });
              setCompanyDetail(JSON.stringify(findCompany));
            } else {
              setCompany(null);
            }
          }}
        />
      )} */}
      {user && user?.user_type != "admin" && !isShowCompanyDropdown() && (
        <SelectMuiAutocomplete
          name="companyDetail"
          value={companyDetail}
          placeholder="Select Company"
          onChange={(e) => {
            if (e) {
              setCompany(e?.value ? e?.value : null);
              setCompanyDetail(e);
            } else {
              setCompany(null);
              setCompanyDetail(null);
            }
          }}
          disabled={!Allow() && NotAllow()}
          options={companies}
          searchData={getCompanies}
        />
      )}
    </Box>
  );
};

export default SelectCompany;
