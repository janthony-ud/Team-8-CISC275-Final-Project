import { User } from "../interfaces/user";
import React from "react";
import YourList from "./UserList";
import { useState } from "react";

interface Props {
    admin: User[];
}

const AdminLists: React.FC<Props> = ({ admin }) => {
    const adminlist = [...admin];
    const [admins] = useState<User[]>(
        adminlist.filter((admins) => admins.role == "admin")
    );

    return (
        <div>
            {admins.map((admin) => (
                <div key={admin.name}>
                    {admin.name}
                    <YourList user={admin}></YourList>
                </div>
            ))}
        </div>
    );
};

export default AdminLists;
