import React from 'react';
import { Selector } from '../components/primitives'
import { ManagePanel } from '../components/templates';
import useProfiles from '../hooks/useProfiles';
import useNetwork from '../hooks/useNetwork';
import { columns } from '../resources/tables'

function BlockedProfiles() {

    const defaultValue = 'facebook'
    const { profiles, getBlockedProfiles } = useProfiles({ type: 'blocked', network: defaultValue })
    const { networks } = useNetwork()

    return (
        <ManagePanel
            title='Perfiles bloqueados'
            customHeader={false}
            tableAtributes={{
                data: profiles,
                columns: columns.profiles,
                loading: profiles.length ? false : true,
            }}
            customContent={
                <Selector
                    data={networks}
                    onChange={getBlockedProfiles}
                    defaultValue={defaultValue}
                />
            }
        />
    );
}

export default BlockedProfiles;