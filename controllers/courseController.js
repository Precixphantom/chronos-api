import Course from '../models/Course.js';
import Task from '../models/Task.js';

// create a new course 
export const createCourse = async (req, res) => {
    try {
        const { courseTitle, description } = req.body;

        const course = new Course({
            courseTitle,
            description,
            user: req.user.id
        });

        await course.save();

         return res.status(201).json(course);
    } catch (err) {
        return res.status(500).json({ message: "Error creating course", error: err.message });
    }
};

// get all courses 
export const getCourses = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const courses = await Course.find({ user: req.user.id }).sort({ createdAt: -1 });

    const results = await Promise.all(
      courses.map(async (course) => {
        const taskCount = await Task.countDocuments({ course: course._id });
        const completedTasks = await Task.countDocuments({ course: course._id, completed: true });

        return {
          _id: course._id,
          title: course.courseTitle || course.title || "Untitled",
          description: course.description || "",
          taskCount,
          completedTasks,
        };
      })
    );

    res.status(200).json(results);
  } catch (err) {
    console.error("getCourses error:", err); // <--- important for debugging
    res.status(500).json({ message: "Error fetching courses", error: err.message });
  }
};



// get one course
export const getCourse = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findOne({ _id: id, user: req.user._id });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json({ course });
    } catch (err) {
        res.status(500).json({ message: "Error fetching course" });
    }
}

// update a course
export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params

        const course = await Course.findOneAndUpdate(
            { _id: id, user: req.user.id},
            req.body,
            {new: true}
        );

        if (!course) {
            return res.status(404).json({message: "Course not found"});
        }
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: "Error updating course", error: err.message });
    }
};

// delete a course 
export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findOneAndDelete({ _id: id, user: req.user.id });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json({ message: "Course deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting course ", error: err.message});
    }
};