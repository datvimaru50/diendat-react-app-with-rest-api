import React from 'react';
import { FacebookProvider, Page } from 'react-facebook';
 
export default class FacebookPage extends React.Component {
constructor(props) {
    super(props);
    }
  render() {
    return (
      <FacebookProvider appId="857489674587649">
        <Page href="https://www.facebook.com/toituduy.net" smallHeader={true} />
      </FacebookProvider>    
    );
  }
}