import { Container, Text, VStack, Button, Input } from "@chakra-ui/react";
import { useDishes, useAddDish, useUpdateDish, useDeleteDish } from "../integrations/supabase/index.js";
import { useState } from "react";

const Index = () => {
  const { data: dishes, isLoading, isError } = useDishes();
  const addDish = useAddDish();
  const updateDish = useUpdateDish();
  const deleteDish = useDeleteDish();

  const [newDish, setNewDish] = useState({ name: "", country: "", size: "", type: "", price: 0 });

  const handleAddDish = () => {
    addDish.mutate(newDish);
    setNewDish({ name: "", country: "", size: "", type: "", price: 0 });
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading dishes</Text>;

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Welcome to Your React App</Text>
        <Text>This is a basic structure ready for further development.</Text>
        <VStack spacing={2}>
          {dishes.map((dish) => (
            <VStack key={dish.id} spacing={1}>
              <Text>{dish.name}</Text>
              <Button onClick={() => updateDish.mutate({ ...dish, name: dish.name + " Updated" })}>Update</Button>
              <Button onClick={() => deleteDish.mutate(dish.id)}>Delete</Button>
            </VStack>
          ))}
        </VStack>
        <Input placeholder="Name" value={newDish.name} onChange={(e) => setNewDish({ ...newDish, name: e.target.value })} />
        <Input placeholder="Country" value={newDish.country} onChange={(e) => setNewDish({ ...newDish, country: e.target.value })} />
        <Input placeholder="Size" value={newDish.size} onChange={(e) => setNewDish({ ...newDish, size: e.target.value })} />
        <Input placeholder="Type" value={newDish.type} onChange={(e) => setNewDish({ ...newDish, type: e.target.value })} />
        <Input placeholder="Price" type="number" value={newDish.price} onChange={(e) => setNewDish({ ...newDish, price: Number(e.target.value) })} />
        <Button onClick={handleAddDish}>Add Dish</Button>
      </VStack>
    </Container>
  );
};

export default Index;