const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('counter')
  .description('CLI to do file based tasks')
  .version('0.8.0');

program.command('add_todo')
  .description('Add todo to Json File')
  .argument('<tasks...>', 'Tasks to be added to file')
  .action((tasks) => {
    fs.readFile("todos.json", 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data);
        let total_tasks = Object.keys(obj).length;

        const keys = Object.keys(obj);
        let last_task_id = keys[keys.length - 1];
        
        let current_task_id = parseInt(last_task_id) + 1;
        tasks.forEach((task) => {
            obj[current_task_id] = [task, "Pending"];
            current_task_id++;
            
          });
          console.log(obj)
          fs.writeFile("todos.json", JSON.stringify(obj), (err) => {
            if (err)
              console.log(err);
            else {
              console.log("Task Added successfully\n");
            }
          });
      }
    });
  });


program.command('mark_done')
.description('Mark a todo as done in Json File')
.argument('<task_id>', 'Task ID to be marked as done')
.action((task_id) => {
fs.readFile("todos.json", 'utf8', (err, data) => {
    if (err) {
    console.log(err);
    } else {
    obj = JSON.parse(data);
    if(task_id in obj)
    {
        obj[task_id][1] = "Done"
        
        fs.writeFile("todos.json", JSON.stringify(obj), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("Task Marked Done successfully\n");
        }
        });
    }
    else{
        console.log("Wrong ID");
    }
    
    }
});
});

program.command('delete_todo')
  .description('Delete todo from Json File')
  .argument('<task_id>', 'Tasks ID to be deleted')
  .action((task_id) => {
    fs.readFile("todos.json", 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data);
        if(task_id in obj)
        {
            delete obj[task_id];
            console.log(obj)
            fs.writeFile("todos.json", JSON.stringify(obj), (err) => {
            if (err)
                console.log(err);
            else {
                console.log("Task Deleted successfully\n");
            }
            });
        }
        else{
            console.log("Wrong ID");
        }
      }
    });
  });

  program.command('get_tasks')
  .description('Get Tasks from Json File')
  .action(() => {
    fs.readFile("todos.json", 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data);
        
        
        for (let key in obj) {
            console.log(`Task ID: ${key}, Task Information: ${obj[key]}`);
        }
      }
    });
  });

program.parse();