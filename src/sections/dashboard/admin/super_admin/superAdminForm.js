import { PasswordBox, TextBox } from "@/components/form";
// import { userType } from "@/utils/constant";
import { Grid } from "@mui/material";

const SuperAdminFormSection = ({ formik, id }) => {
  return (
    <Grid container spacing={2}>
      {/* <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          disabled={true}
          label="User Type"
          placeholder="Select user"
          name="user_type"
          value={formik.values.user_type}
          onChange={(e) => formik.setFieldValue("user_type", e.target.value)}
          error={formik.touched.user_type && formik.errors.user_type}
          helperText={formik.touched.user_type && formik.errors.user_type}
        />
      </Grid> */}
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          label="Name"
          isMaxLenght={20}
          name="name"
          value={formik?.values?.name}
          onChange={(e) => {
            formik.setFieldValue("name", e.target.value.trimStart());
          }}
          error={formik.touched.name && formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
          required
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextBox
          fullWidth
          isMaxLenght={50}
          label="Email"
          name="email"
          value={formik?.values?.email}
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
          required
        />
      </Grid>
      <Grid
        item
        lg={id === "new" ? 6 : 6}
        md={id === "new" ? 6 : 6}
        sm={12}
        xs={12}
      >
        <TextBox
          fullWidth
          label="Phone"
          name="phone"
          isMaxLenght={10}
          value={formik?.values?.phone}
          onChange={(e) => {
            if (e) {
              formik.setFieldValue("phone", e.target.value.replace(/\D/gm, ""));
            }
          }}
          error={formik.touched.phone && formik.errors.phone}
          helperText={formik.touched.phone && formik.errors.phone}
          required
        />
      </Grid>
      {id === "new" && (
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <PasswordBox
            fullWidth
            label="Password"
            name="password"
            value={formik?.values?.password}
            onChange={(e) => {
              formik.setFieldValue(
                "password",
                e.target.value.trim().replace(" ", "")
              );
            }}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            required
          />
        </Grid>
      )}
      {/* <Grid item lg={6} md={6} sm={12} xs={12}>
        <DragDrop
          fullWidth={true}
          name="photo"
          url="admin/upload/image"
          value={formik.values.photo}
          onChange={(e) => {
            formik.setFieldValue("photo", e);
          }}
        />
      </Grid> */}
    </Grid>
  );
};

export default SuperAdminFormSection;
