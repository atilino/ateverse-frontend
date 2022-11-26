import { DashboardHeader } from 'components/Headers';
import useAccount from 'hooks/useAccount';
import React from 'react';
import AccountsSummaryTable from './components/AccountsSummaryTable';

function AccountsSummary(props) {
  const { accountsSummary } = useAccount({ service: 'accountsSummary' })
  return (
    <>
      <AccountsSummaryTable accounts={accountsSummary}/>
    </>
  );
}

export default AccountsSummary;