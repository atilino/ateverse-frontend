import React from 'react';
import { Col, Row } from 'antd';
import { ManageTable } from '.';
import { ManageHeader } from '../organisms';
import { PageTitle } from '../primitives';

function ManagePanel({
    title,
    customHeader = true,
    customContent,
    model,
    reload = () => {},
    children,
    tableAtributes = {
        data: [],
        columns: [],
        actions: [],
        onActionClick: (e, index, id) => (e, index, id),
        loading: false,
        defaultPageSize,
        children
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
            <Row>
                {children}
            </Row>
        </>
    );
}

export default ManagePanel;