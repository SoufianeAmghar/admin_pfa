import { Avatar } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./UpdateArticle.css";

const UpdateArticle = () => {
    // const [picture, setPicture] = useState("");
    // const [isPicture, setIsPicture] = useState(false);
    // const [content, setContent] = useState("");

    const handleDelete = (id) => {
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${
        //             JSON.parse(sessionStorage.getItem("token")).token
        //         }`,
        //     },
        // };
        // axios.delete("http://localhost:9000/api/events/" + id);
        console.log(id);
        setRelatedProducts(
            relatedProducts.filter((item) => {
                // if (item._id !== id)
                //     setNotRelatedProducts([...notRelatedProducts, item]);
                return item._id !== id;
            })
        );
        console.log(id);
    };

    const handleDelete2 = (item) => {
        console.log(item);
        setRelatedProducts([...relatedProducts, item]);
        console.log(id);
    };

    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [notRelatedProducts, setNotRelatedProducts] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const columns = [
        { field: "_id", headerName: "ID", width: 90 },
        {
            field: "title",
            headerName: "Title",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        {params.row.img ? (
                            <img
                                className="userListImg"
                                src={params.row.img}
                                alt=""
                            />
                        ) : (
                            <Avatar
                                sx={{ bgcolor: red[500] }}
                                aria-label="recipe"
                                className="userListImg"
                            >
                                {params.row.title[0]}
                            </Avatar>
                        )}
                        {params.row.title}
                    </div>
                );
            },
        },
        {
            field: "desc",
            headerName: "Description",
            width: 240,
            // renderCell: (params) => {
            //     return new Date(params.row.startDate).toLocaleDateString(
            //         "fr-FR"
            //     );
            // },
        },
        {
            field: "price",
            headerName: "Unit Price",
            width: 120,
            renderCell: (params) => {
                return `${params.row.price}` + "DH";
            },
        },
        {
            field: "isComposite",
            headerName: "Type",
            width: 120,
            renderCell: (params) => {
                return params.row.isComposite ? "Compose" : "Simple";
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        {/* <Link to={"/events/" + params.row._id}>
                            <button className="userListEdit">View</button>
                        </Link> */}
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    const columns2 = [
        { field: "_id", headerName: "ID", width: 90 },
        {
            field: "title",
            headerName: "Title",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        {params.row.img ? (
                            <img
                                className="userListImg"
                                src={params.row.img}
                                alt=""
                            />
                        ) : (
                            <Avatar
                                sx={{ bgcolor: red[500] }}
                                aria-label="recipe"
                                className="userListImg"
                            >
                                {params.row.title[0]}
                            </Avatar>
                        )}
                        {params.row.title}
                    </div>
                );
            },
        },
        {
            field: "desc",
            headerName: "Description",
            width: 240,
            // renderCell: (params) => {
            //     return new Date(params.row.startDate).toLocaleDateString(
            //         "fr-FR"
            //     );
            // },
        },
        {
            field: "price",
            headerName: "Unit Price",
            width: 120,
            renderCell: (params) => {
                return `${params.row.price}` + "DH";
            },
        },
        {
            field: "isComposite",
            headerName: "Type",
            width: 120,
            renderCell: (params) => {
                return params.row.isComposite ? "Compose" : "Simple";
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        {/* <Link to={"/events/" + params.row._id}>
                            <button className="userListEdit">View</button>
                        </Link> */}
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete2(params.row)}
                        />
                    </>
                );
            },
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (s.length > 140 || content === "") {
        //     setError(true);
        // } else {
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${
        //             JSON.parse(sessionStorage.getItem("token")).token
        //         }`,
        //     },
        // };
        axios
            .put(
                "http://localhost:9000/api/events/" + id,
                {
                    name: name,
                    startDate: startDate,
                    endDate: endDate,
                    products: relatedProducts.map((product) => product._id),
                }
                // config
            )
            .then(() => {
                document.querySelector("input[type=text]").value = "";
                // document.querySelector("textarea").value = "";
                setName("");
                setStartDate(new Date().toLocaleDateString());
                setEndDate(new Date().toLocaleDateString());
                setError(false);
                navigate("/events");
            })
            .catch((e) => {
                console.log(e);
                setError(true);
            });
        // }
    };

    useEffect(() => {
        axios
            .get(`http://localhost:9000/api/events/${id}`)
            .then((res) => {
                setName(res.data.name);
                setStartDate(res.data.startDate);
                setEndDate(res.data.endDate);
                setRelatedProducts(res.data.products);
                // setContent(res.data.content);
                console.log(res.data);
            })
            .then(() => {
                axios.get("http://localhost:9000/api/products").then((res) => {
                    const ids = relatedProducts.map((item) => item._id);
                    setNotRelatedProducts(
                        res.data.filter((item) => !ids.includes(item._id))
                    );
                });
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:9000/api/products").then((res) => {
            const ids = relatedProducts.map((item) => item._id);
            setNotRelatedProducts(
                res.data.filter((item) => !ids.includes(item._id))
            );
        });
    }, [relatedProducts]);

    return (
        <div className="newArticle">
            <h1>Edit Event</h1>

            <form action="" onSubmit={(e) => handleSubmit(e)}>
                <input
                    onInput={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name of the Event"
                    autoComplete="off"
                    value={name}
                />
                <input
                    onInput={(e) => setStartDate(e.target.value)}
                    type="date"
                    name="startDate"
                    id="startDate"
                    placeholder="From"
                    autoComplete="off"
                    value={startDate.substring(0, 10)}
                />
                <input
                    onInput={(e) => setEndDate(e.target.value)}
                    type="date"
                    name="endDate"
                    id="endDate"
                    placeholder="To"
                    autoComplete="off"
                    value={endDate.substring(0, 10)}
                />
                {error && <p>Veuillez ecrire moins de 140 caracteres</p>}
                <input type="submit" value="Update" />
                <br />
            </form>
            <div className="mb-2">
                <h1>Related product</h1>
                <DataGrid
                    rows={relatedProducts}
                    disableSelectionOnClick
                    columns={columns}
                    getRowId={(row) => row._id}
                    pageSize={3}
                    checkboxSelection
                />
            </div>
            <br />
            <br />
            <div className="mt-2">
                <h1>Other product</h1>
                <DataGrid
                    rows={notRelatedProducts}
                    disableSelectionOnClick
                    columns={columns2}
                    getRowId={(row) => row._id}
                    pageSize={8}
                    checkboxSelection
                />
            </div>
        </div>
    );
};

export default UpdateArticle;
