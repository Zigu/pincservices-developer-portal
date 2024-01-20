import React, {ReactNode, useMemo, useState} from "react";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {EntityLayout} from "@backstage/plugin-catalog";
import {EntityPlaylistDialog} from "@backstage/plugin-playlist";


export const EntityLayoutWrapper = (props: { children?: ReactNode }) => {
    const [playlistDialogOpen, setPlaylistDialogOpen] = useState(false);

    // @ts-ignore
    const extraMenuItems = useMemo<ExtraContextMenuItem[]>(() => {
        return [
            {
                title: 'Add to playlist',
                Icon: PlaylistAddIcon,
                onClick: () => setPlaylistDialogOpen(true),
            },
        ];
    }, []);

    return (
        <>
            <EntityLayout UNSTABLE_extraContextMenuItems={extraMenuItems}>
                {props.children}
            </EntityLayout>
            <EntityPlaylistDialog
                open={playlistDialogOpen}
                onClose={() => setPlaylistDialogOpen(false)}
            />
        </>
    );
};
