export const RegularList = ({
  items,
  resourceName,
  itemComponent: ItemComponent,
}) => {
  return (
    <>
      {items.map((item, i) => (
        <ItemComponent key={i} {...{ [resourceName]: item }} />
      ))}
    </>
  );
};

const PersonListItem = ({ person }) => {
  const { name, age } = person;

  return (
    <>
      <p>{name}</p>
      <p>{age}</p>
    </>
  );
};

const App = () => {
  return (
    <>
      <RegularList
        items={people}
        resourceName={"person"}
        itemComponent={PersonListItem}
      />
    </>
  );
};


export const NumberedList = ({
  items,
  resourceName,
  itemComponent: ItemComponent,
}) => {
  return (
    <>
      {items.map((item, i) => (
        <>
        <p>{i + 1}</p>
        <ItemComponent key={i} {...{ [resourceName]: item }} />
        </>
      ))}
    </>
  );
};