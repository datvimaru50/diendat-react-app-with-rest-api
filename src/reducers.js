const rootReducer = (state = ['Do not mutate state!'], action) => {
    switch(action.type) {
      case 'ADD_TO_DO':
        const result = [...state];
        result.push(action.todo); // vì sao k thể chuyển thẳng dòng này xuống return
        return result;
      default:
        return state;
    }
  };

  export default rootReducer

  