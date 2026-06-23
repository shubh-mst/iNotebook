// import Notes from "./Notes";
// const Home = (props) => {
//   const { showAlert } = props;
//   return (
//     <div>
//       <Notes showAlert={showAlert} />
//     </div>
//   );
// };

// export default Home;

import Notes from "./Notes";

const Home = ({ showAlert, searchTerm }) => {
  return (
    <div>
      <Notes showAlert={showAlert} searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
