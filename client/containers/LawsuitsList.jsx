import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLawsuitsList } from '../actions/lawsuitsListAction';
import { withRouter } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { participate } from '../actions/participateAction'

class LawsuitsList extends Component {
  componentWillMount () {
    this.props.fetchLawsuitsList();
  }

  addParticipate = (lawsuitId) => {
    participate({ 
      lawsuitID: lawsuitId, 
      userID: 1
    })
  }

  render () {
    if (this.props.lawsuits === undefined) return <div>loading</div>;
    return (
      <div>
        {this.props.lawsuits.map((lawsuit, index) => (
          <Card key={index} className='cards-container'>
            <CardTitle title={lawsuit.title} subtitle={lawsuit.category} />
            <CardText>
              {lawsuit.description}
          </CardText>
            <CardActions>
              <FlatButton label='Participate' onClick={() => this.addParticipate(lawsuit.id)}/>
              <FlatButton label='Share' />
            </CardActions>
          </Card>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ lawsuits }) => ({
  ...lawsuits
});

export default connect(mapStateToProps, { fetchLawsuitsList })(LawsuitsList);
