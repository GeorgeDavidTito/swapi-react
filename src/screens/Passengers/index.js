import React from 'react'
import Layout from '../../components/Layout'
import MainPanel from '../../components/MainPanel'

import Table from './PassengersList'

const Passengers = () => {
  return (
    <Layout>
      <MainPanel backgroundColor="white">
        <Table />
      </MainPanel>
    </Layout>
  )
}

export default React.memo(Passengers)

/**
 * Styles
 */
