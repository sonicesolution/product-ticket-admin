import PropTypes from "prop-types";
import { forwardRef } from "react";
// next
import NextLink from "next/link";
// @mui
import { Tooltip, Link, ListItemText, Typography } from "@mui/material";
// auth
import { RoleBasedGuard } from "@/auth";
//
import Iconify from "@/components/iconify/Iconify";
import { StyledItem, StyledIcon } from "./styles";

// ----------------------------------------------------------------------
function NavItems(
  { item, depth, open, active, isExternalLink, ...other },
  ref
) {
  const {
    title,
    path,
    icon,
    children,
    disabled,
    caption,
    roles,
    isLink = true,
  } = item;

  const subItem = depth !== 1;

  const renderContent = (
    <StyledItem
      ref={ref}
      open={open}
      depth={depth}
      active={active}
      disabled={disabled}
      {...other}
    >
      {icon && <StyledIcon>{icon}</StyledIcon>}

      <ListItemText
        primary={`${title}`}
        primaryTypographyProps={{
          noWrap: true,
          sx: {
            width: 72,
            fontSize: 10,
            lineHeight: "16px",
            textAlign: "center",
            ...(active && {
              fontWeight: "fontWeightMedium",
            }),
            ...(subItem && {
              fontSize: 14,
              width: "auto",
              textAlign: "left",
            }),
          },
        }}
      />

      {caption && (
        <Tooltip title={`${caption}`} arrow placement="right">
          <Iconify
            icon="eva:info-outline"
            width={16}
            sx={{
              top: 11,
              left: 6,
              position: "absolute",
            }}
          />
        </Tooltip>
      )}

      {!!children && (
        <Iconify
          width={16}
          icon="eva:chevron-right-fill"
          sx={{
            top: 11,
            right: 6,
            position: "absolute",
          }}
        />
      )}
    </StyledItem>
  );

  // const renderItem = () => {
  //   // ExternalLink
  //   if (isExternalLink)
  //     return (
  //       <Link href={path} target="_blank" rel="noopener" underline="none">
  //         {renderContent}
  //       </Link>
  //     );

  //   // Default
  //   return (
  //     <Link component={NextLink} href={path} underline="none">
  //       {renderContent}
  //     </Link>
  //   );
  // };
  const renderItem = () => {
    // ExternalLink
    if (isExternalLink)
      return (
        <Link href={path} target="_blank" rel="noopener" underline="none">
          {renderContent}
        </Link>
      );

    if (isLink) {
      // Default
      return (
        <Link component={NextLink} href={path} underline="none">
          {renderContent}
        </Link>
      );
    } else {
      return (
        <Typography component="p" variant="body2">
          {renderContent}
        </Typography>
      );
    }
  };

  return <RoleBasedGuard roles={roles}> {renderItem()} </RoleBasedGuard>;
}

const NavItem = forwardRef(NavItems);

NavItem.propTypes = {
  open: PropTypes.bool,
  active: PropTypes.bool,
  item: PropTypes.object,
  depth: PropTypes.number,
  isExternalLink: PropTypes.bool,
};

export default NavItem;
