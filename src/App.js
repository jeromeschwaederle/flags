import classes from "./App.module.css";

import Container from "./UI/Container";

const App = () => {
  return (
    <Container>
      <h1 className={classes.h1}>Titre exexptionel</h1>
      <section className={classes.section}>
        <h2>premier titre</h2>
        <p>Un paragraphe très intéressant.</p>
      </section>
    </Container>
  );
};

export default App;
