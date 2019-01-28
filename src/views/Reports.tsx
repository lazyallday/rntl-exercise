import * as React from 'react';
import { connect } from 'react-redux';
import { db } from 'services/firebase';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core';
import { ReduxState } from 'services/types';
import { RemoteData, InStoreApi, ShopApi } from 'common/types';
import Container from 'components/Container';
import Typography from '@material-ui/core/Typography';
import ReactTable from 'react-table';
import "react-table/react-table.css";

interface State {
    rentals: RemoteData<InStoreApi[]>,
}

interface StateToProps {
    shop: ShopApi,
}

type Props = StateToProps & WithStyles<typeof styles>;

class Reports extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            rentals: { kind: 'LOADING' }
        };
    }

    componentDidMount() {
        this.getRentals();
    }

    getRentals() {
        const shopId = this.props.shop.id;
        const rentalsRef = db.collection('rentals')
            .where('shopId', '==', shopId)
            .where('rentalState', '==', 'COMPLETED')
            .orderBy('endDate', 'asc');
        rentalsRef.get().then((querySnapshot) => {
            const rentalList: InStoreApi[] = [];
            for (const rentalDoc of querySnapshot.docs) {
                const rental = rentalDoc.data() as InStoreApi;
                rentalList.push(rental);
            }
            const rentals: RemoteData<InStoreApi[]> = { kind: 'FETCHED', data: rentalList };
            this.setState({
                rentals
            });
        }, (error) => {
            const rentals: RemoteData<InStoreApi[]> = { kind: 'ERROR', error: error.message };
            this.setState({
                rentals
            });
        });
    }

    renderRentals() {
        // const classes = this.props.classes;
        const rentals = this.state.rentals;
        if (rentals.kind === 'LOADING') {
            return <div>Loading</div>;
        }
        if (rentals.kind === 'ERROR') {
            return <div>{rentals.error}</div>;
        }

        const rentalData = rentals.data;

        const columns = [
            {
                Header: "First Name",
                accessor: "responsiblePerson.firstName"
            },
            {
                Header: "Last Name",
                accessor: "responsiblePerson.lastName"
            },
            {
                Header: "Date",
                accessor: "endDate"
            },
            {
                Header: "Amount",
                accessor: "charge.amount"
            }
        ];

        return (
            <ReactTable
                data={rentalData}
                columns={columns}
                defaultPageSize={20}
                className="-striped -highlight"
            />
        );
    }

    render() {
        const classes = this.props.classes;
        return (
            <Container>
                <Typography variant="h5" gutterBottom className={classes.header}>
                    The report
                </Typography>
                {this.renderRentals()}
            </Container>
        );
    }
}

const mapStateToProps = ({ shops }: ReduxState): StateToProps => {
    const { activeShop } = shops;
    return { shop: activeShop! };
};

const styles = (theme: Theme) => createStyles({
    header: {
        marginBottom: 32,
    },
    leftAlign: {
        textAlign: 'left',
    },
});

export default withStyles(styles)(connect(mapStateToProps, {})(Reports));
