import React, { useEffect, useState } from "react";
import { Schemas } from "../Schemas";
import { useApi } from "@backstage/core-plugin-api";
import { zallyApiRef } from "../../api";
import { Rules } from "../Rules";
import { forceChangeAndClear, getIDFromURL } from "../../helpers";
import { Header } from "../Header";
import {
    ViolationsByString,
    ViolationsResponse,
} from "../../api/types";
import {useEntity} from "@backstage/plugin-catalog-react";

type APILinterProps = {
    sendPageView?: VoidFunction;
};

export const APILinter = ({
                            sendPageView = undefined,
                        }: APILinterProps) => {
    const { entity } = useEntity();
    const [externalId, setExternalId] = useState(getIDFromURL(location.pathname));
    const [schemaInput, setSchemaInput] = useState(entity.spec!.definition as string);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [response, setResponse] = useState<ViolationsResponse>();
    const [openRules, setOpenRules] = useState(false);
    const zally = useApi(zallyApiRef);


    const handleJsonParsing = (rawValue: string) => {
        let schema = rawValue;
        try {
            schema = JSON.parse(rawValue);
        } catch {
            return schema;
        }
        const stringified = JSON.stringify(schema, null, 4);
        return stringified;
    };

    const fetchData = (url: ViolationsByString) => {
        setLoading(true);

        zally
            .getApiViolations(url)
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            })
            .then((res) => {
                setResponse(res as ViolationsResponse);
            })
            .finally(() => setLoading(false));
    };

    const toggleDrawer = () => {
        setOpenRules((prev) => !prev);
    };

    const handleSubmitSchema = () => {
        setError("");
        setResponse(undefined);
        if (!schemaInput) return;

        fetchData({
            api_definition_string: schemaInput,
        });
    };

    useEffect(() => {
        if (externalId) {
            zally
                .getSchemaAndViolations(externalId)
                .then((data) => {
                    setResponse(data);
                    setSchemaInput(handleJsonParsing(data.api_definition));
                })
                .catch((err: Error) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [zally, externalId]);

    useEffect(() => {
        if (response?.api_definition) {
            setSchemaInput(handleJsonParsing(response.api_definition));
        }
    }, [response?.api_definition]);

    useEffect(() => {
        sendPageView?.();
    }, [sendPageView]);

    const clearAll = () => {
        setResponse(undefined);
        forceChangeAndClear(setSchemaInput, 0);
    };

    return (
        <>
            <Header toggleDrawer={toggleDrawer} />

            <Schemas
                handleClearAll={clearAll}
                onSubmit={handleSubmitSchema}
                schemaValue={schemaInput}
                response={response}
                loading={loading}
                error={error}
                onExternalIdChange={setExternalId}
            />

            <Rules
                openRules={openRules}
                toggleDrawer={toggleDrawer}
            />
        </>
    );
};
