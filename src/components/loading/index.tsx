import 'nprogress/nprogress.css';

import { Component } from 'react';
import NProgress from 'nprogress';

export default class LoadingComponent extends Component {
  constructor(props:any) {
    super(props);
    NProgress.start();
  }

  componentDidMount() {
    NProgress.done();
  }

  render() {
    return <div />;
  }
}
