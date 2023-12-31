"use client";
import PropTypes from "prop-types";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, Button, AppBar, Toolbar, Container, Link } from "@mui/material";
// hooks
import useOffSetTop from "@/hooks/useOffSetTop";
import useResponsive from "@/hooks/useResponsive";
// utils
import { bgBlur } from "@/utils/cssStyles";
// config
import { HEADER } from "@/utils/config-global";
// routes
import { PATH_DOCS, PATH_PAGE } from "@/routes/paths";
// components
import Logo from "@/components/logo/Logo";
//
import NavMobile from "./nav/mobile";
// import navConfig from "./nav/config-navigation";
import NavDesktop from "./nav/desktop";
import { useRouter } from "next/router";
import useMenu from "@/hooks/useMenu";

// ----------------------------------------------------------------------

const MainHeader = () => {
  const theme = useTheme();
  const router = useRouter();
  const { navConfigMenu } = useMenu();

  const isDesktop = useResponsive("up", "md");

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <AppBar color="transparent" sx={{ boxShadow: 0 }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(["height", "background-color"], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: "flex", alignItems: "center" }}>
          <Logo />

          <Link
            href={PATH_DOCS.changelog}
            target="_blank"
            rel="noopener"
            underline="none"
            sx={{ ml: 1 }}
          ></Link>

          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <NavDesktop isOffset={isOffset} data={navConfigMenu} />}

          <Button
            variant="contained"
            onClick={() => router.push(PATH_PAGE.login)}
          >
            Login
          </Button>

          {!isDesktop && <NavMobile isOffset={isOffset} data={navConfigMenu} />}
        </Container>
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  );
};

const Shadow = ({ sx, ...other }) => {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: "auto",
        borderRadius: "50%",
        position: "absolute",
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme?.customShadows?.z8,
        ...sx,
      }}
      {...other}
    />
  );
};

Shadow.propTypes = {
  sx: PropTypes.object,
};

export default MainHeader;
// ----------------------------------------------------------------------
