import { CardContent, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "@backstage/core-components";
import * as S from "./detailscard_styles";

type DetailsCardProps = {
    key: string;
    title: string;
    description?: string;
    link: string;
    pointer?: string;
    type: string;
    isViolation?: boolean;
};

export const RulesDetailsCard: React.VFC<DetailsCardProps> = ({
                                                             key,
                                                             title,
                                                             type,
                                                             description,
                                                             link,
                                                             pointer,
                                                             isViolation,
                                                         }) => {
    const cardType = isViolation ? "violation" : "rule";
    return (
        <S.Card
            key={key}
        >
            <CardContent key={title} data-testid={cardType}>
                <S.Chip
                    label={type.toLocaleLowerCase()}
                />
                <S.CardText variant="h6">{title}</S.CardText>

                {description && (
                    <S.CardText variant="subtitle1">{description}</S.CardText>
                )}

                <Typography
                    variant="subtitle1"
                    component="div"
                >
                    <Link style={{ wordBreak: "break-all" }} to={link}>
                        Rule: {link}
                    </Link>
                </Typography>

                {pointer && (
                    <S.CardText style={{ wordBreak: "break-all" }} variant="subtitle1">
                        Location: {pointer}
                    </S.CardText>
                )}
            </CardContent>
        </S.Card>
    );
};
