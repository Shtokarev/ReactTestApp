import React from "react";
import logo from "../../assets/images/logo.svg";
import { api } from "../../services/api";
import css from "./Home.module.scss";
import { NavLink } from "react-router-dom";
import { routes } from "../../routes";

// test page
class Home extends React.PureComponent {
  state = {
    data: ["Loading", "..."],
  };

  componentDidMount = async () => {
    try {
      // check refresh tokens queue
      const requests = [
        await api.get("test"),
        await api.get("test"),
        await api.get("test"),
      ];
      const result = await Promise.all(requests);
      this.setState({ data: result[0]?.data?.data?.array });
    } catch (error) {
      debugger;
      console.log(error);
    }
  };

  render = () => (
    <div className={css.App}>
      <header className={css["App-header"]}>
        <div className={css.navigation}>
          <NavLink to={routes.home()}>Home</NavLink>
          <NavLink to={routes.map()}>Map</NavLink>
          <NavLink to={routes.upload()}>Upload</NavLink>
          <NavLink to={routes.login()}>Login</NavLink>
          <NavLink to={routes.signup()}>Singup</NavLink>
          <NavLink to={routes.restricted()}>Restricted</NavLink>
        </div>
        <img src={logo} className={css["App-logo"]} alt="logo" />
        <p>
          {this.state.data.map((item: string) => (
            <span key={item} style={{ marginRight: "10px" }}>
              {item}
            </span>
          ))}
        </p>
        CRA Application
      </header>
    </div>
  );
}

export default Home;
