import { Course, Level } from '@Course/course.interface';
import { requiredString, requiredNumber } from '@Common/Models/common';
import { Document, model, Schema } from 'mongoose';

const courseSchema = new Schema<Course>(
  {
    _instructor: [
      {
        ref: 'Instructor',
        type: Schema.Types.ObjectId,
      },
    ],
    announcements: [
      {
        createdAt: Date,
        description: String,
        title: String,
      },
    ],
    captions: [requiredString],
    category: requiredString,
    coupouns: [
      {
        code: String,
        count: Number,
        discount: Number,
        expiryDate: Date,
      },
    ],
    description: requiredString,
    duration: {
      required: true,
      type: Number,
    },
    exam: [
      {
        answer: String,
        options: [{ type: String }],
        question: String,
      },
    ],
    frequentlyAskedQuestions: [
      {
        answer: String,
        question: String,
        votes: Number,
      },
    ],
    keywords: [
      {
        type: String,
      },
    ],
    language: requiredString,
    level: {
      enum: Object.values(Level),
      required: true,
      type: String,
    },
    numberOfEnrolledTrainees: {
      default: 0,
      type: Number,
    },
    outline: [
      {
        type: String,
      },
    ],
    previewVideoURL: requiredString,
    price: {
      currency: { ...requiredString, default: 'USD' },
      currentValue: {
        required: true,
        type: Number,
        // get: getPrice,
      },
      discounts: [
        {
          endDate: Date,
          percentage: Number,
          startDate: Date,
        },
      ],
    },
    rating: {
      averageRating: {
        max: 5,
        min: 0,
        required: true,
        type: Number,
      },
      reviews: [
        {
          _user: {
            ref: 'User',
            type: Schema.Types.ObjectId,
          },
          comment: String,
          createdAt: Date,
          rating: {
            max: 5,
            min: 0,
            required: true,
            type: Number,
          },
        },
      ],
    },
    sections: [
      {
        description: String,
        exercises: [
          {
            answer: String,
            options: [{ type: String }],
            question: String,
          },
        ],
        lessons: [
          {
            description: String,
            duration: Number,
            title: String,
            videoURL: String,
          },
        ],
        title: requiredString,
      },
    ],
    subcategory: [requiredString],
    thumbnail: requiredString,
    title: requiredString,
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
  },
);

//validate course pre save mongoose middleware

courseSchema.pre('save', function (next) {
  try {
    // Validate answer is included inside options array in exam
    this.exam.forEach(question => {
      if (!question.options.includes(question.answer)) {
        throw new Error('Answer is not included inside options array in exam');
      }
    });

    // Validate answer is included inside options array in sections exercises
    this.sections.forEach(section => {
      section.exercises.forEach(exercise => {
        if (!exercise.options.includes(exercise.answer)) {
          throw new Error('Answer is not included inside options array in sections exercises');
        }
      });
    });

    // check price.discount is below 100 and above 0
    this.price.discounts.forEach(discount => {
      if (discount.percentage > 100 || discount.percentage < 0) {
        throw new Error('Discount percentage is not valid');
      }
    });

    next();
  } catch (error) {
    next(error);
  }
});

// courseSchema.post('save', function(err, doc, next) {
//   if (err.name === 'ValidationError') {
//     for (let field in err.errors) {
//       console.log(field);
//       console.log(err.errors[field].message);
//       next(err);
//   }
//   } else {
//     next(err);
//   }
// });

const courseModel = model<Course & Document>('Course', courseSchema);
export default courseModel;
