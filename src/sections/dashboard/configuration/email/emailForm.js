import { TextBox } from "@/components/form";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { isEmpty } from "lodash";
import React from "react";

const EmailFormSection = ({ formik, addEmail, removeEmail }) => {
  console.log("formik?.values", formik?.errors);
  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            {formik.values &&
              formik?.values?.settings?.length > 0 &&
              formik?.values?.settings.map((item, index) => {
                return (
                  <Card key={`Email-Settings-${index}`}>
                    <CardContent>
                      <Box mb={2} textAlign="right">
                        <IconButton
                          size="small"
                          onClick={() => removeEmail(index)}
                          // disabled={index === 0}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </Box>
                      <Grid container spacing={2}>
                        <React.Fragment>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextBox
                              fullWidth
                              isMaxLenght={50}
                              label={`Email ${index + 1}`}
                              name={`settings[${index}].email`}
                              value={item.email}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  `settings[${index}].email`,
                                  e.target.value.trimStart()
                                );
                                if (!e.target.value) {
                                  formik.setFieldValue(
                                    `settings[${index}].hours`,
                                    ""
                                  );
                                }
                              }}
                              error={
                                formik?.errors?.settings &&
                                formik?.errors?.settings?.length > 0 &&
                                formik?.errors?.settings[index]?.email
                              }
                              helperText={
                                formik?.errors?.settings &&
                                formik?.errors?.settings?.length > 0 &&
                                formik?.errors?.settings[index]?.email
                              }
                            />
                          </Grid>
                          <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextBox
                              fullWidth
                              label="Hours"
                              name={`settings[${index}].hours`}
                              isMaxLenght={10}
                              value={item?.hours}
                              onChange={(e) => {
                                if (e) {
                                  formik.setFieldValue(
                                    `settings[${index}].hours`,
                                    e.target.value.replace(/\D/gm, "")
                                  );
                                }
                              }}
                              disabled={isEmpty(item.email) ? true : false}
                              error={
                                formik?.errors?.settings &&
                                formik?.errors?.settings?.length > 0 &&
                                formik?.errors?.settings[index]?.hours
                              }
                              helperText={
                                formik?.errors?.settings &&
                                formik?.errors?.settings?.length > 0 &&
                                formik?.errors?.settings[index]?.hours
                              }
                              // error={formik.touched.hours && formik.errors.hours}
                              // helperText={formik.touched.hours && formik.errors.hours}
                            />
                          </Grid>
                          {/* <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextBox
                  fullWidth
                  isMaxLenght={50}
                  label="Sort By"
                  name={`settings[${index}].sort_by`}
                  value={item.sort_by}
                  onChange={(e) => {
                    formik.setFieldValue(
                      `settings[${index}].sort_by`,
                      e.target.value.trimStart()
                    );
                  }}
                  error={formik.touched.email_1 && formik.errors.email_1}
                  helperText={formik.touched.email_1 && formik.errors.email_1}
                />
              </Grid> */}
                        </React.Fragment>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })}
            <Box sx={{ textAlign: "right" }}>
              <Button
                onClick={() => addEmail()}
                variant="contained"
                color="primary"
              >
                Add Email
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default EmailFormSection;
