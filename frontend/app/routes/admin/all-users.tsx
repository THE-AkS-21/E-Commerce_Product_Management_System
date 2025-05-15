import React, { useEffect, useState } from 'react';
import { Header } from "../../../components";
import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page } from "@syncfusion/ej2-react-grids";
import { formatDate } from "~/lib/utils";
import { AllUsersData } from "~/components/userComponent";

const AllUsers = () => {
    const { users, error } = AllUsersData();

    const [userData, setUserData] = useState<any[]>([]);

    // Simulate delay and log when user data is loaded
    useEffect(() => {
        if (users && users.length > 0) {
            console.log("Fetched users:", users);
            setTimeout(() => {
                setUserData(users);
                console.log("User data loaded into grid.");
            }, 300);
        }
    }, [users]);

    // Role column template with conditional color classes
    const roleTemplate = (props: any) => {
        const colorClass = props.role === 'ADMIN' ? 'text-red-600' : 'text-green-600';
        return <span className={`font-bold ${colorClass}`}>{props.role}</span>;
    };

    return (
        <main className="all-users wrapper">
            <Header
                title="ALL CUSTOMERS"
                description="Check out all users"
            />

            <GridComponent
                dataSource={userData}
                allowPaging={true}
                pageSettings={{ pageSize: 10 }}
            >
                <ColumnsDirective>
                    <ColumnDirective
                        field="id"
                        headerText="ID"
                        width="50"
                        textAlign="Left"
                    />
                    <ColumnDirective
                        field="username"
                        headerText="Username"
                        width="120"
                        textAlign="Left"
                    />
                    <ColumnDirective
                        field="email"
                        headerText="E-mail"
                        width="150"
                        textAlign="Left"
                    />
                    <ColumnDirective
                        field="createdAt"
                        headerText="Date Joined"
                        width="100"
                        textAlign="Center"
                        template={({ createdAt }: any) => formatDate(createdAt)}
                    />
                    <ColumnDirective
                        field="role"
                        headerText="ROLE"
                        width="100"
                        textAlign="Center"
                        template={roleTemplate}
                    />
                </ColumnsDirective>
                <Inject services={[Page]} />
            </GridComponent>
        </main>
    );
}

export default AllUsers;
