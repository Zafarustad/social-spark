import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserDispatch } from '../Actions/userActions';
import { closeSearchDialog } from '../Actions/dataActions';
import SparkLoader from '../Loaders/SparkLoader';
import axios from 'axios';
import { isMobile } from 'react-device-detect';
import Grid from '@material-ui/core/Grid';
import Spark from './Spark';
import MobileNav from './MobileNav';
import ProfileLoader from '../Loaders/ProfileLoader';
import StaticProfile from './StaticProfile';
import EmptySparks from '../assets/empty.png';

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      sparkIdParam: null,
      loading: false,
    };
  }

  componentDidMount() {
    const { username, sparkId } = this.props.match.params;
    if (sparkId)
      this.setState({
        sparkIdParam: sparkId,
      });

    this.getuserProfileInfo(username);
    this.props.getUserDispatch(username);
  }

  componentDidUpdate(prevProps) {
    const {
      params: { username },
    } = this.props.match;

    if (prevProps.match.params.username !== username) {
      this.props.closeSearchDialog();
      this.getuserProfileInfo(username);
      this.props.getUserDispatch(username);
    }
  }

  getuserProfileInfo = (username) => {
    this.setState({ profile: null });
    axios
      .get(`/user/${username}`)
      .then((res) => {
        this.setState({ profile: res.data.user });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { sparks, loading } = this.props.data;
    const { sparkIdParam } = this.state;

    const sparkMarkup = loading ? (
      Array.from({ length: 12 }).map((item, index) => {
        return <SparkLoader key={index} />;
      })
    ) : sparks.length === 0 ? (
      <div className='m-t-20'>
        <p className='text-center'>No Sparks from this user</p>
        {!isMobile ? (
          <img src={EmptySparks} alt='avatar' width='800px' height='500px' />
        ) : (
          <img src={EmptySparks} width='410px' alt='avatar' height='340px' />
        )}
      </div>
    ) : !sparkIdParam ? (
      sparks.map((spark) => (
        <Spark userProfile={true} key={spark.sparkId} spark={spark} />
      ))
    ) : (
      sparks.map((spark) => {
        if (spark.sparkId === sparkIdParam)
          return (
            <Spark
              userProfile={true}
              key={spark.sparkId}
              spark={spark}
              openDialog
            />
          );
        else
          return <Spark userProfile={true} key={spark.sparkId} spark={spark} />;
      })
    );

    return (
      <div className='container'>
        <MobileNav />
        <Grid container>
          {!isMobile ? (
            <>
              <Grid item xs={3} className='flex-row'>
                {this.state.profile === null ? (
                  <div style={{ marginLeft: '10px' }}>
                    <ProfileLoader />
                  </div>
                ) : (
                  <StaticProfile
                    profile={this.state.profile}
                    getuserProfileInfo={this.getuserProfileInfo}
                  />
                )}
              </Grid>
              <Grid item xs={9} className='flex-row wrap'>
                {sparkMarkup}
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} className='flex-row justify-content-center'>
                {this.state.profile === null ? (
                  <ProfileLoader />
                ) : (
                  <StaticProfile
                    profile={this.state.profile}
                    getuserProfileInfo={this.getuserProfileInfo}
                  />
                )}
              </Grid>
              <Grid
                item
                xs={12}
                className='flex-row wrap'
                style={{ marginLeft: '10px' }}
              >
                {sparkMarkup}
              </Grid>
            </>
          )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ user, data }) => ({ user, data });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUserDispatch,
      closeSearchDialog,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(User));
