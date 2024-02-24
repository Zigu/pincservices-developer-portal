import React from "react";
import { Box } from "@material-ui/core";
import * as S from "./styles";


type HeaderProps = {
    toggleDrawer: VoidFunction;
};

export const Header: React.FC<HeaderProps> = ({toggleDrawer}) => {
    return (
        <>
            <Box display="flex" justifyContent="space-between">
                <S.Title variant="subtitle1">
                    Check if your Swagger Schema conforms to
                    <S.SubtitleLink
                        to="https://sunrise.zalando.net/docs/default/Component/api/"
                    >
                        Zalando's RESTful API and Event Guidelines
                    </S.SubtitleLink>
                </S.Title>
                <S.RulesLinkWrapper onClick={toggleDrawer}>
                    <S.BookIcon />
                    <S.RulesLink>
                        VIEW THE RULES
                    </S.RulesLink>
                </S.RulesLinkWrapper>
            </Box>
        </>
    );
};
