const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

function list(request, response) {
    response.json({ data: orders });
}   

function create(request, response) {
    const { data: { deliverTo, mobileNumber, status, dishes } = {} } = request.body;
    const newOrder = {
        id: nextId(),
        deliverTo,
        mobileNumber,
        status: status || "pending",
        dishes,
    };
    orders.push(newOrder);
    response.status(201).json({ data: newOrder });
}   
function realorder(request, response, next) { 
    const { orderId } = request.params;
    const foundOrder = orders.find((order) => order.id === orderId);    
    if (foundOrder) {
        response.locals.order = foundOrder;
        return next();
    }

    next({ status: 404, message: `Order does not exist: ${orderId}.` });
}

function read(request, response) {
    response.json({ data: response.locals.order });
}       
function update(request, response) {
    const order = response.locals.order;
    const { data: { deliverTo, mobileNumber, status, dishes } = {} } = request.body;    
    order.deliverTo = deliverTo;
    order.mobileNumber = mobileNumber;
    order.status = status;  
    order.dishes = dishes;
    response.json({ data: order });
}   
function destroy(request, response) {
    const index = orders.findIndex((order) => order.id === response.locals.order.id);       
    if (index > -1) {
        orders.splice(index, 1);
    }   
    response.sendStatus(204);
}   

function checkorderID(request, response, next) {
    const { orderId } = request.params;
    const { data: { id } = {} } = request.body; 
    if (id && id !== orderId) {
        return next({
            status: 400,
            message: `Order id does not match route id. Order: ${id}, Route: ${orderId}`,
        });
    }   
    next();
}
function checkstatus(request, response, next) {
    const { data: { status } = {} } = request.body;    
    const Statuses = ["pending", "preparing", "out-for-delivery", "delivered"];        
    if (!status || !Statuses.includes(status)) {
        return next({
            status: 400,    
            message: `Order must have a status of pending, preparing, out-for-delivery, delivered`,
        });
    }           
    next();
}       



function checkpending(request, response, next) {        
    const { status } = response.locals.order;
    if (status !== "pending") {
        return next({
            status: 400,
            message: `An order cannot be deleted unless it is pending`,
        });
    }       
    next();
}
function checkorderdata(request, response, next) {
    const { data: { deliverTo, mobileNumber, dishes } = {} } = request.body;    
    if (!deliverTo) {
        return next({ status: 400, message: "Order must include a deliverTo" });
    }
    if (!mobileNumber) {
        return next({ status: 400, message: "Order must include a mobileNumber" });
    }
    if (!dishes) {
        return next({ status: 400, message: "Order must include a dish" });
    }
    if (!Array.isArray(dishes) || dishes.length === 0) {
        return next({ status: 400, message: "Order must include at least one dish" });
    }
    for (let i = 0; i < dishes.length; i++) {
        if (!Number.isInteger(dishes[i].quantity) || dishes[i].quantity <= 0) {
            return next({
                status: 400,
                message: `dish ${i} must have a quantity that is an integer greater than 0`,
            });
        }
    }
    next();
}


module.exports = {
	list,
	create: [checkorderdata, create],
	read: [realorder, read],
	update: [realorder, checkorderID, checkorderdata, checkstatus, update],
	delete: [realorder, checkpending, destroy],
};
