import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
// import { Text } from 'react-native-elements';
import { moment } from '../../utils/Omni';
// import { cleanUpHtmlTag } from '../../utils/html';
import { colorSet, fontSizeSet } from '../../AppStyles';
import { log } from '../../utils/log'

export default class Article extends React.Component {
  render() {    
    log('test data')
    log(this.props)
    const { title, categoryNew, updated_at } = this.props.article;
    const time = moment(updated_at || moment.now()).fromNow();

    // const article = cleanUpHtmlTag(content);

    // let description = '';
    // if (summary && summary.length >= 100) {
    //   description = summary;
    // }

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this.props.openNews}>
        <View style={styles.article}>
          <View style={styles.metaFooter}>
            <Text style={styles.catText}>{/*categoryNew.categoryNewName.toUpperCase()*/'Canh bao'}</Text>           
            <Text style={styles.noteText}>{time}</Text>
          </View>
          <View style={styles.featureHeader}>
            <Text style={styles.featuredTitleStyle}>{title}</Text>
          </View>
          {/* <Text style={styles.descText}>{description || `${Languages.ReadMore}...`}</Text>
          <Divider style={{ backgroundColor: colorSet.border }} /> */}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  article: {
    borderColor: colorSet.white,
    borderWidth: 1,
    borderRadius: 7,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginVertical: 15,
    backgroundColor: colorSet.white,
  },
  featureHeader: {
    paddingHorizontal: 10,
    paddingVertical: 25,
    backgroundColor: colorSet.white,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  metaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: colorSet.kttvPrimary,
  },
  descText: {
    marginBottom: 5,
    // fontStyle: 'italic',
    color: colorSet.Text,
    fontSize: fontSizeSet.subNormal,
  },
  catText: {
    marginVertical: 5,
    // fontStyle: 'italic',
    color: colorSet.white,
    textTransform: 'uppercase',
    fontSize: fontSizeSet.subNormal,
  },
  noteText: {
    marginVertical: 5,
    // fontStyle: 'italic',
    color: colorSet.white,
    fontSize: fontSizeSet.small,
  },
  featuredTitleStyle: {
    marginHorizontal: 5,
    color: colorSet.Text,
    fontSize: fontSizeSet.large,
    fontWeight: '700',
    textTransform: 'uppercase',
    // textShadowColor: colorSet.Text,
    // textShadowOffset: { width: 3, height: 3 },
    // textShadowRadius: 3,
  },
};
