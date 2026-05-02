import { Box, Typography } from "@mui/material";
import AddressLink from "components/AddressLink";
import React, { FunctionComponent } from "react";
import { JettonDetailMessage } from "pages/jetton/types";
import LoadingContainer from "components/LoadingContainer";
import {
  RowActionsButton,
  RowContent,
  RowTitle,
  RowValueDisplayer,
  RowValueSection,
} from "pages/jetton/dataRow/styled";
import { MessageRenderer } from "pages/jetton/dataRow/utils";
import { AppHeading } from "components/appHeading";

export interface DataRowProps {
  title: string;
  value?: string | null | number | JSX.Element;
  message?: JettonDetailMessage | undefined;
  address?: string | null;
  actions?: FunctionComponent[] | undefined;
  dataLoading: boolean;
  description?: string;
  hasButton?: boolean;
  showIcon?: boolean;
  children?: React.ReactNode;
  regularAddress?: boolean;
}

export const DataRow: React.FC<DataRowProps> = ({
  title,
  value,
  message,
  actions,
  dataLoading,
  description,
  address,
  hasButton,
  showIcon = true,
  children,
  regularAddress,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      {/* RowContent is now a horizontal flex: title on left, value on right */}
      <RowContent>
        <RowTitle variant="h6">{children ? children : title}</RowTitle>

        <RowValueDisplayer>
          <LoadingContainer loading={dataLoading} loaderHeight="50%">
            <RowValueSection hasButton={hasButton}>
              {address && value ? (
                <AddressLink
                  address={address}
                  value={value}
                  showIcon={showIcon}
                  regularAddress={regularAddress}
                />
              ) : (
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#FFFFFF",
                    fontWeight: 500,
                    wordBreak: "break-word",
                    textAlign: "right",
                  }}>
                  {value || "-"}
                </Typography>
              )}
            </RowValueSection>
            {actions && (
              <RowActionsButton>
                {actions.map((action, index) => {
                  const ActionComponent = action;
                  return <ActionComponent key={index} />;
                })}
              </RowActionsButton>
            )}
          </LoadingContainer>
        </RowValueDisplayer>
      </RowContent>

      {/* Description sits BELOW the row, full width, muted */}
      {description && (
        <AppHeading
          text={description}
          variant="h6"
          marginTop={4}
          marginBottom={8}
          fontSize={11.5}
          fontWeight={400}
          color="rgba(255,255,255,0.38)"
        />
      )}
      {!dataLoading && <MessageRenderer message={message} />}
    </Box>
  );
};
