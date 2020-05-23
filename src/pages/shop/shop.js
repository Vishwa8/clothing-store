import React from 'react';
import CollectionsOverview from "../../components/collections-overview/collections-overview";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/collection";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase-utils";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop-actions";

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        this.unsubscribeFromSnapshot =  collectionRef.onSnapshot(async snapShot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapShot);
            updateCollections(collectionMap)
        });
    }

    render() {
        const { match } = this.props;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        );
    }
} 

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);