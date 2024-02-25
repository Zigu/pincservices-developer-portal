/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {DependencyGraphTypes} from '@backstage/core-components';
import {humanizeEntityRef} from '@backstage/plugin-catalog-react';
import React, {useLayoutEffect, useRef, useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

import {DEFAULT_NAMESPACE} from '@backstage/catalog-model';
import {EntityNodeData} from "@backstage/plugin-catalog-graph";
import {useApp} from "@backstage/core-plugin-api";

import WorkIcon from '@material-ui/icons/Work';

const useStyles = makeStyles(
    theme => ({
        node: {
            fill: theme.palette.grey[100],
            stroke: theme.palette.grey[100],

            '&.primary': {
                fill: theme.palette.primary.light,
                stroke: theme.palette.primary.light,
            },
            '&.secondary': {
                fill: theme.palette.secondary.light,
                stroke: theme.palette.secondary.light,
            },
            '&.highlight': {
                fill: '#f73378',
                stroke: '#f73378',
            },
            '&.system': {
                fill: '#F5B041',
                stroke: '#F5B041',
            },
            '&.domain': {
                fill: '#F5B041',
                stroke: '#F5B041',
            },
            '&.api-public': {
                fill: '#8bc34a',
                stroke: '#8bc34a',
            },
            '&.api-internal': {
                fill: '#4caf50',
                stroke: '#4caf50',
            },
            '&.component': {
                fill: '#2471A3',
                stroke: '#2471A3',
            },
            '&.service': {
                fill: '#2196f3',
                stroke: '#2196f3',
            },
            '&.index-model': {
                fill: '#6573c3',
                stroke: '#6573c3',
            },
            '&.website': {
                fill: '#673ab7',
                stroke: '#673ab7',
            },
            '&.library': {
                fill: '#a31545',
                stroke: '#a31545',
            },
            '&.resource': {
                fill: '#ff5722',
                stroke: '#ff5722',
            },

            '&.group': {
                fill: '#85C1E9',
                stroke: '#85C1E9',
            },

            '&.user': {
                fill: '#85C1E9',
                stroke: '#85C1E9',
            },
        },
        text: {
            fill: theme.palette.getContrastText(theme.palette.grey[300]),

            '&.primary': {
                fill: theme.palette.primary.contrastText,
            },
            '&.secondary': {
                fill: theme.palette.secondary.contrastText,
            },
            '&.focused': {
                fontWeight: 'bold',
            },
        },
        clickable: {
            cursor: 'pointer',
        },
    }),
);

export function EntityKindIcon({
                                   kind,
                                   ...props
                               }: {
    kind: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    className?: string;
}) {
    const app = useApp();
    const Icon =
        app.getSystemIcon(`kind:${kind.toLocaleLowerCase('en-US')}`) ?? WorkIcon;
    return <Icon {...props} />;
}

export function CustomRenderNode({
                                      node: { id, entity, color = 'default', focused, onClick },
                                  }: DependencyGraphTypes.RenderNodeProps<EntityNodeData>) {
    const classes = useStyles();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const idRef = useRef<SVGTextElement | null>(null);

    useLayoutEffect(() => {
        // set the width to the length of the ID
        if (idRef.current) {
            let { height: renderedHeight, width: renderedWidth } =
                idRef.current.getBBox();
            renderedHeight = Math.round(renderedHeight);
            renderedWidth = Math.round(renderedWidth);

            if (renderedHeight !== height || renderedWidth !== width) {
                setWidth(renderedWidth);
                setHeight(renderedHeight);
            }
        }
    }, [width, height]);

    const {
        kind,
        metadata: { name, namespace = DEFAULT_NAMESPACE, title }
    } = entity;

    const system = entity.spec?.system;

    let finalStyle = kind?.toLowerCase();

    if (kind?.toLowerCase() === 'api') {
        finalStyle = system ? 'api-public' : 'api-internal';
    }

    if (kind?.toLowerCase() === 'component' && entity.spec?.type) {
        finalStyle = entity.spec?.type as string;
    }

    const padding = 10;
    const iconSize = height;
    const paddedIconWidth = kind ? iconSize + padding : 0;
    const paddedWidth = paddedIconWidth + width + padding * 2;
    const paddedHeight = height + padding * 2;

    let displayTitle =
        title ??
        (kind && name && namespace
            ? humanizeEntityRef({ kind, name, namespace })
            : id);

    if (kind?.toLowerCase() === 'user') {
        const profile = entity.spec?.profile;
        // @ts-ignore
        displayTitle = profile?.displayName;
    }

    return (
        <g onClick={onClick} className={classNames(onClick && classes.clickable)}>
            <rect
                className={classNames(
                    classes.node,
                    color === 'primary' && `primary ${finalStyle}`,
                    color === 'secondary' && 'highlight'
                )}
                width={paddedWidth}
                height={paddedHeight}
                rx={10}
            />
            {kind && (
                <EntityKindIcon
                    kind={kind}
                    y={padding}
                    x={padding}
                    width={iconSize}
                    height={iconSize}
                    className={classNames(
                        classes.text,
                        focused && 'focused',
                        color === 'primary' && 'primary',
                        color === 'secondary' && 'secondary',
                    )}
                />
            )}
            <text
                ref={idRef}
                className={classNames(
                    classes.text,
                    focused && 'focused',
                    color === 'primary' && 'primary',
                    color === 'secondary' && 'secondary',
                )}
                y={paddedHeight / 2}
                x={paddedIconWidth + (width + padding * 2) / 2}
                textAnchor="middle"
                alignmentBaseline="middle"
            >
                {displayTitle}
            </text>
        </g>
    );
}
