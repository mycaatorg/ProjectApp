
"use client";

import React from 'react';
import { useParams } from 'next/navigation';

const courseDescriptions: { [key: string]: { title: string; description: string } } = {
  'computer-science': {
    title: 'Computer Science',
    description: 'Computer Science is the study of computers and computational systems. It deals with the theory, design, development, and application of software and software systems. Principal areas of study include artificial intelligence, computer systems and networks, security, database systems, human-computer interaction, vision and graphics, numerical analysis, programming languages, software engineering, bioinformatics, and theory of computing.',
  },
  'medical-science': {
    title: 'Medical Science',
    description: 'Medical Science is a broad field that encompasses a variety of disciplines related to the human body and health. It includes areas such as anatomy, physiology, biochemistry, pharmacology, and pathology. This field is foundational for careers in medicine, dentistry, veterinary medicine, and biomedical research, focusing on understanding diseases and improving health outcomes.',
  },
  'business': {
    title: 'Business',
    description: 'The field of Business involves the practice of managing a company, organization, or other entity. It covers a wide range of topics including finance, marketing, human resources, and operations management. A degree in business prepares individuals for roles in leadership and administration across various industries.',
  },
  'arts': {
    title: 'Arts',
    description: 'The Arts encompass a broad range of human activities and the products of those activities, involving creative or imaginative talent. This field includes visual arts (painting, sculpture), literary arts (poetry, fiction), and performing arts (music, dance, theatre). Study in the arts cultivates critical thinking, communication, and cultural understanding.',
  },
  'engineering': {
    title: 'Engineering',
    description: 'Engineering is the application of science and mathematics to solve problems. Engineers design, build, and maintain everything from small-scale electronics to large-scale structures like bridges and spacecraft. Major branches include civil, mechanical, electrical, and chemical engineering.',
  },
  'information-technology': {
    title: 'Information Technology',
    description: 'Information Technology (IT) focuses on the use of computers to store, retrieve, transmit, and manipulate data. IT professionals are responsible for designing, implementing, and maintaining computer networks, software, and databases, ensuring that an organization\'s technological infrastructure runs smoothly.',
  },
  'law': {
    title: 'Law',
    description: 'The study of Law involves understanding the system of rules that a particular country or community recognizes as regulating the actions of its members and which it may enforce by the imposition of penalties. It prepares individuals for careers as lawyers, judges, and legal consultants.',
  },
  'psychology': {
    title: 'Psychology',
    description: 'Psychology is the scientific study of the mind and behavior. It explores how people think, feel, and act, both individually and in groups. This field includes various sub-disciplines such as clinical, cognitive, social, and developmental psychology.',
  },
  'education': {
    title: 'Education',
    description: 'The field of Education is concerned with the theory and practice of teaching and learning. It prepares individuals for careers as teachers, administrators, and curriculum developers, focusing on pedagogical methods and educational psychology to foster effective learning environments.',
  },
  'economics': {
    title: 'Economics',
    description: 'Economics studies how societies allocate scarce resources. It analyzes the production, distribution, and consumption of goods and services. Key areas include microeconomics, which focuses on individual agents, and macroeconomics, which looks at the economy as a whole.',
  },
  'environmental-science': {
    title: 'Environmental Science',
    description: 'Environmental Science is an interdisciplinary field that integrates physical, biological, and information sciences to study the environment and find solutions to environmental problems. It addresses issues such as climate change, pollution, and resource conservation.',
  },
  'media-and-communication': {
    title: 'Media and Communication',
    description: 'Media and Communication examines how information is created, distributed, and interpreted. This field covers various forms of media, including print, broadcast, and digital, and explores their impact on society, culture, and politics.',
  },
  'political-science': {
    title: 'Political Science',
    description: 'Political Science is the study of politics and power from domestic, international, and comparative perspectives. It entails understanding political ideas, ideologies, institutions, policies, processes, and behavior, as well as groups, classes, government, diplomacy, law, strategy, and war.',
  },
  'design': {
    title: 'Design',
    description: 'Design is a creative field that involves planning and creating objects, systems, or experiences with a specific purpose. It includes disciplines such as graphic design, industrial design, fashion design, and user experience (UX) design, blending aesthetics with functionality.',
  },
  'data-science': {
    title: 'Data Science',
    description: 'Data Science is an interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data. It combines elements of statistics, computer science, and domain expertise to analyze and interpret complex data.',
  },
  'management': {
    title: 'Management',
    description: 'Management is the administration of an organization, whether it be a business, a non-profit organization, or a government body. It is the art and science of managing resources of the business. Management includes the activities of setting the strategy of an organization and coordinating the efforts of its employees to accomplish its objectives through the application of available resources, such as financial, natural, technological, and human resources.',
  },
  'architecture': {
    title: 'Architecture',
    description: 'Architecture is the art and science of designing and constructing buildings and other physical structures. It involves a wide range of skills, from artistic vision to technical knowledge of materials and construction methods. Architects shape the built environment to meet human needs and aesthetic desires.',
  },
  'international-relations': {
    title: 'International Relations',
    description: 'International Relations is a field of political science that studies the relationships between countries, the roles of sovereign states, inter-governmental organizations, international non-governmental organizations, and multinational corporations. It examines issues such as globalization, state sovereignty, international security, ecological sustainability, and human rights.',
  },
};

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const course = courseDescriptions[slug];

  if (!course) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
        <p>The course you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{course.title}</h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        {course.description}
      </p>
    </div>
  );
}