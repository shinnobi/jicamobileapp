import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';

import { actions as newsActions } from '../../redux/NewsRedux';
//import TransparentLayout from '../../components/TransparentLayout';
import WebView from '../../components/WebView';
import Back from '../../components/Back';
import Divider from '../../components/Divider';
// import Spinner from '../../components/Spinner';
import { colorSet } from '../../AppStyles';
import { cleanUpHtmlTag } from '../../utils/html';
import { log } from '../../utils/Omni';
import styles from './styles';

class NewsDetailScreen extends React.Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);

    this.state = {};
  }

  detail = () => {
    const { navigation } = this.props;
    const article =
      navigation.state && navigation.state.params && navigation.state.params.article
        ? navigation.state.params.article
        : null;

    const { tittle, content } = article;
    if (!article || !content) {
      return null;
    }
    const text = cleanUpHtmlTag(content);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{tittle}</Text>
        <Divider />
        <ScrollView>
          <WebView textColor={colorSet.Text} fontSize={13} html={text} />
        </ScrollView>
      </View>
    );
  };

  backButton = () => {
    const { navigation } = this.props;
    return <Back navigation={navigation} />;
  };

  render() {
    // const { isFetching } = this.props;

    return (
      <React.Fragment>
        <View backButton={this.backButton}>{this.detail()}</View>
        {/* {isFetching ? <Spinner mode="overlay" /> : null} */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ netInfo, weatherNews }) => ({
  // netInfo,
  // isFetching: weatherNews.isFetching,
  news: weatherNews.news,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    getWeatherNews: () => {
      dispatch(newsActions.getWeatherNews());
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(NewsDetailScreen);
