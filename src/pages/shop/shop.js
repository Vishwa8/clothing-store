import React from 'react';
import CollectionsOverview from "../../components/collections-overview/collections-overview";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/collection";

const ShopPage = ({ match }) => (
    <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
);

export default ShopPage;