import React, {useEffect} from "react";
import "swagger-ui-react/swagger-ui.css";
import { Box } from "@material-ui/core";
import { Violations } from "../Violations";
import { ViolationsResponse } from "../../api/types";
import SwaggerUI from "swagger-ui-react";

import * as S from "./styles";

type SchemasProps = {
    onSubmit: () => void;
    schemaValue: string;
    response?: ViolationsResponse;
    loading: boolean;
    error: string;
    onExternalIdChange: (arg: string) => void;
    handleClearAll: VoidFunction;
};

export const Schemas: React.FC<SchemasProps> = ({
                                                    onSubmit,
                                                    schemaValue,
                                                    response,
                                                    loading,
                                                    error,
                                                    onExternalIdChange
                                                }) => {

    useEffect(() => {
        if (schemaValue && !response)
            onSubmit()
    }, [onSubmit, schemaValue, response]);

    return (
        <Box display="flex" flexDirection="column" width="100%">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-end"
                width="100%"
            >
                {/*
                <Box display="flex" justifyContent="space-between">
                    <S.Button
                        border="true"
                        variant="outlined"
                        onClick={onSubmit}
                        data-testid="schema-validate"
                        disabled={!schemaValue}
                    >
                        Validate
                    </S.Button>

                </Box>
                */}
            </Box>

            <S.Box>
                <S.SwaggerUIWrapper>
                    <SwaggerUI spec={schemaValue} />
                </S.SwaggerUIWrapper>

                <S.ViolationsWrapper>
                    <Violations
                        response={response}
                        loading={loading}
                        error={error}
                        onExternalIdChange={onExternalIdChange}
                    />
                </S.ViolationsWrapper>
            </S.Box>
        </Box>
    );
};
