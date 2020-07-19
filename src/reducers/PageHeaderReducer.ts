const initialState = {
    visible: false
};

const PageHeaderReducer = (state = initialState, action: any) => {
    
    switch (action.type) {
        case "pageHeaderToggle":
            state = {visible: action.payload.status}
    }

    return state;
}

export default PageHeaderReducer;