const users = [];

const addUser = (id, name, room) => {
 
  name = name.trim();
  room = room.trim();

  const existingUser = users.filter((user) => user.room === room && user.name === name);

  if(!name || !room) 
    return {error: 'Please enter username and room id' };
  
  if(existingUser.length>0) 
    return { error: 'This Username is taken , select any other' };

  const user = { id, name, room };

  users.push(user);

  return { user };
}

const removeUser = (id) => {

  // const removedUser=users.filter((user) =>{ 
    
  //   if(user.id === id)
  //     return true
  //   else return false
  // });
  // users=removedUser;

  // return removedUser;

  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };