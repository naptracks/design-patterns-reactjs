export const SplitScreen = ({
    left: Left,
    right: Right,
   
}) => {


    return (
      <div style={styles.container}>
        <div style={styles.pane}>
          <Left />
        </div>
        <div style={styles.pane}>
          <Right />
        </div>
      </div>
    );
}

const styles = {
    container: {
        display: "flex",
    },
    pane: {
        flex: 1
    }
}
