import React from 'react';
import { Col, Row } from 'antd';
import { ManageTable } from '.';
import { ManageHeader } from '../organisms';
import { PageTitle } from '../primitives';

function ManagePanel({
    title,
    customHeader = true,
    customContent = undefined,
    model,
    reload = () => { },
    children,
    tableAtributes = {
        data: [],
        columns: [],
        actions: [],
        onActionClick: (e, index, id) => (e, index, id),
        loading: false,
        defaultPageSize: 10,
        children: undefined
    }
}) {
    return (
        <>
            {customHeader ?
                <ManageHeader title={title} model={model} reload={reload} />
                :
                <PageTitle>
                    {title}
                </PageTitle>
            }
            {customContent}
            {!children &&
                <Row>
                    <Col span={24}>
                        <ManageTable
                            loading={tableAtributes.loading}
                            columns={tableAtributes.columns}
                            dataSource={tableAtributes.data}
                            actions={tableAtributes.actions}
                            onActionClick={tableAtributes.onActionClick}
                            defaultPageSize={tableAtributes.defaultPageSize}
                        >
                            {tableAtributes.children}
                        </ManageTable>
                    </Col>
                </Row>
            }
            <Row>
                {children}
            </Row>
        </>
    );
}

export default ManagePanel;
