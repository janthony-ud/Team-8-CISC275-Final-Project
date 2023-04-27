import React, { useState } from "react";
import { User } from "../interfaces/user";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

const UserArray: User[] = [];

export function AddUser() {
    const [user, setUser] = useState<User[]>([]);
    const [name, setName] = useState<string>("");
    const [role, setRole] = useState<string>("");
    //const[array, setArray] = useState<User[]>;

    function changename(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }
    function changerole(event: React.ChangeEvent<HTMLInputElement>) {
        setRole(event.target.value);
    }

    function updateUsers(name1: string, role1: string) {
        const newUser: User = { name: name1, userMovies: [], role: role1 };
        setUser([...user, newUser]);
    }

    return (
        <div>
            <h3>Add a New User:</h3>

            <Form.Group controlId="name-text">
                <Form.Label>Enter Name:</Form.Label>
                <Form.Control value={name} onChange={changename} />
            </Form.Group>
            <Form.Group controlId="name-text">
                <Form.Label>Enter Role:</Form.Label>
                <Form.Control value={role} onChange={changerole} />
            </Form.Group>
            <Button onClick={() => updateUsers(name, role)}>Save </Button>
            {user.map((user) => (
                <div key={user.name}>
                    <div>
                        {user.name} {user.role}
                    </div>
                </div>
            ))}
        </div>
    );
}

/*   function createNewUser(
        name: string,
        userMovies: Movie[],
        role: string
    ): User {
        return {
            name: name,
            userMovies: userMovies,
            role: role
        };
    } */

/*     function changename(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }
    function changerole(event: React.ChangeEvent<HTMLInputElement>) {
        setRole(event.target.value);
    }
    function push() {
        <div></div>;
    } */

// const user1: User = { name: name, userMovies: [], role: role };
