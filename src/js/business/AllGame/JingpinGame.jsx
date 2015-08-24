import React from 'react';

export default class JingpinGame extends React.Component {
  constructor(prop) {
    super(prop);
  }

  render() {

    let data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        ishot: (i%3), name: "六位六位以上" + i,
        logo: "http://myeducs.cn/uploadfile/201101/17/8E194129931.jpg"
      })
    }

    var eles = data.map((value, index) => {
      return <li className={"jpgame-item"} key={index}>
        <a href="#">
          <i className={value.ishot ? "ico-hot" : ""}></i>
          <img className="logo" src={value.logo} alt={value.name}/>
          {value.name}
          </a>
      </li>
    });

    return <div className="jpgame">
      <ul className="jpgame-list inline-wrap">{eles}</ul>
    </div>;
  }
}
