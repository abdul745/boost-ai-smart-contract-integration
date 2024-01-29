import styled from "styled-components";

export const AppStyleForHome = styled.div`
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  color: #333;
  line-height: 1.6;
  padding: 0;
  margin-left: 20px;

}

.container {
  width: 80%;
  margin: auto;
  overflow: hidden;
}

header {
  background: #50b3a2;
  color: #ffffff;
  padding-top: 30px;
  min-height: 70px;
  border-bottom: #e8491d 3px solid;
}

header a {
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 16px;
}

header ul {
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
}

header li {
  float: left;
  display: inline;
  padding: 0 20px 0 20px;
}

header #branding {
  float: left;
}

header #branding h1 {
  margin: 0;
}

header nav {
  float: right;
  margin-top: 10px;
}

header .highlight, header .current a {
  color: #e8491d;
  font-weight: bold;
}

header a:hover {
  color: #ffffff;
  font-weight: bold;
}

.button {
  height: 38px;
  background: #e8491d;
  border: 0;
  padding-left: 20px;
  padding-right: 20px;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease-in;
  margin-left: 25px;
}

.button:hover {
  background: #333333;
}

.wide-input {
  width: 450px; /* or any other width */
  height: 30px;
  margin-left: 25px;

}



input:focus {
  border: 1px solid #50b3a2;
}

h2, h4 {
  color: #333;
  margin-left: 25px;
}

h4 {
  margin-bottom: 10px;
}

section {
  margin-top: 20px;
}
`;
/* Add media queries for responsiveness as needed */
