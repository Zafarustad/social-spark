import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MobileNav from '../Components/MobileNav';
import { getSparksDispatch } from '../Actions/dataActions';
import { isMobile } from 'react-device-detect';
import Grid from '@material-ui/core/Grid';
import Spark from '../Components/Spark';
import SparkLoader from '../Loaders/SparkLoader';

class home extends Component {
  componentDidMount() {
    this.props.getSparksDispatch();
  }

  render() {
    const { sparks, loading } = this.props.data;
    const recentSparks = !loading
      ? sparks.map((spark) => {
          return <Spark key={spark.sparkId} spark={spark} />;
        })
      : Array.from({ length: 18 }).map((item, index) => {
          return <SparkLoader key={index} />;
        });
    return (
      <div className='container'>
        <MobileNav />
        <Grid container>
          {isMobile ? (
            <>
              <Grid
                item
                xs={12}
                // style={{ marginLeft: "10px" }}
              >
                {recentSparks}
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <div className='spark-container'>{recentSparks}</div>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => ({ data });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSparksDispatch,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(home);
