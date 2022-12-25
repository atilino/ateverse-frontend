import { CommentOutlined, EditOutlined, IssuesCloseOutlined, LikeOutlined, ShareAltOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Row } from 'antd';
import useToggle from 'hooks/useToggle';
import React from 'react';
import { ShareIcon } from '../../../../components';

function Summary({ variantName, interactions, executed }) {

  const modalOpen = useToggle(false)

  function SimplifiedSummary() {
    switch (variantName) {
      case 'interaction':
        return <InteractionSummary interactions={interactions} executed={executed} />
      case 'publication':
        return <SummaryRow icons={<EditOutlined/>} actions={<p>{executed.publications.length}/{interactions.publications.length}</p>} />
      case 'join-groups':
        return <SummaryRow icons={<UsergroupAddOutlined />} actions={<p>{executed.groups.length}/{interactions.groups.length}</p>}/>
      case 'share-groups':
        return <SummaryRow icons={<ShareAltOutlined/>} actions={<p>{executed.groups.length}/{interactions.groups.length}</p>}/>
      case 'report':
        return <SummaryRow icons={<IssuesCloseOutlined/>} actions={<p>{executed.reports}/{interactions.reports}</p>}/>
      case 'follow':
        return <SummaryRow icons={<UserAddOutlined/>} actions={<p>{executed.followers}/{interactions.followers}</p>}/>
      case 'direct':
        return <InteractionSummary interactions={interactions} executed={executed} direct={true} />

      default:
        return null
    }
  }
  const InteractionSummary = ({ interactions, executed, direct = false }) => (
    <>
      <SummaryRow
        icons={
          <>
            <LikeOutlined style={{ color: '#0088FF' }} />
            <CommentOutlined style={{ color: '#4E4F50' }} />
            <div>{executed.shares !== undefined && <ShareIcon/>}</div>
          </>
        }
        actions={
          <>
            <p>{executed.reactions} {!direct && `/${interactions.reactions}`}</p>
            <p>{executed.comments.length} {!direct && `/${interactions.comments.length}`}</p>
            <div>{executed.shares !== undefined && <p>{executed.shares} {!direct && `/${interactions.shares}`}</p>}</div>
          </>
        }
      />
    </>
  )

  const SummaryRow = ({ icons, actions }) => (
    <>
      <Row justify='space-around' align='middle'>
        {icons}
      </Row>
      <Row justify='space-around' align='middle'>
        {actions}
      </Row>
    </>
  )

  return (
    <div onClick={modalOpen.toggle} style={{ cursor: 'default', justifyContent: 'center' }}>
      <SimplifiedSummary />
    </div>
  )

}



export default Summary;
