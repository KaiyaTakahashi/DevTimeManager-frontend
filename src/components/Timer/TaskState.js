// import "/Users/kaiyatakahashi/Desktop/DevTimeManager/client/src/styles/components.css"

// var React = require('react');
// var TaskState = React.createClass({
    
//     getInitalState: function() {
//         return {
//             taskState: "progress"
//         };
//     },
//     handleStateChange: function(changeEvent) {
//       this.setState({
//           taskState: changeEvent.target.value
//       });
//     },
//     render: function() {
//         return (
//             <form>
//                 <div className="radio">
//                 <label>
//                     <input 
//                         type="radio"
//                         name="taskState"
//                         value="progress"
//                         checked={this.state.taskState == "progress"}
//                         onChange={this.handleStateChange}
//                     />
//                     In Progress
//                 </label>
//                 </div>
//                 <div className="radio">
//                 <label>
//                     <input 
//                         type="radio"
//                         name="taskState"
//                         value="finished"
//                         checked={this.state.taskState == "finished"}
//                     />
//                     Finished
//                 </label>
//                 </div>
//                 <input type="submit" />
//             </form>
//         );
//     }
// });

// export default TaskState;

import { useForm } from "react-hook-form";
import "/Users/kaiyatakahashi/Desktop/DevTimeManager/client/src/styles/components.css"

function TaskState() {
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // const onSubmit = (data) => {
    //     console.log(data["progress"])
    // }
    const form = useForm({
        defaultValues: {
          isFinished: false
        },
        mode: "onChange"
      });
      const { register } = form;
    return (
            <form>
                <div className="radio">
                <label>
                    <input 
                        {...register("isFinished")}
                        type="radio"
                        defaultChecked={true}
                        value={false}
                    />
                    In Progress
                </label>
                </div>
                <div className="radio">
                <label>
                    <input
                        {...register("isFinished")}
                        type="radio"
                        value={true}
                    />
                    Finished
                </label>
                </div>
                <input type="submit" />
                <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
            </form>
      );
}

export default TaskState;