import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeStrugglingCompetency(payload) {
    let serialize = this;
    payload = {
      struggling_competencies: [
        {
          grade_id: 378,
          grade: 'Grade 8',
          grade_Seq: 9,
          description: '',
          fw_code: 'CT',
          domains: [
            {
              domain_id: 20,
              domain_name: 'Expressions and Equations',
              domain_code: 'EE',
              domain_seq: 9,
              competencies: [
                {
                  comp_code: 'K12.MA-MA5-NOBT-A.01',
                  comp_display_code: '5.NBT.1',
                  comp_name: 'Recognize that in a multi-digit number',
                  comp_student_desc: 'Place Value',
                  comp_seq: 29,
                  student_count: 30
                },
                {
                  comp_code: 'K12.MA-MA5-NOBT-A.01',
                  comp_display_code: '5.NBT.1',
                  comp_name: 'Recognize that in a multi-digit number',
                  comp_student_desc: 'Place Value',
                  comp_seq: 28,
                  student_count: 35
                }
              ]
            },
            {
              domain_id: 20,
              domain_name: 'Expressions and Equations',
              domain_code: 'EE',
              domain_seq: 9,
              competencies: [
                {
                  comp_code: 'K12.MA-MA5-NOBT-A.01',
                  comp_display_code: '5.NBT.1',
                  comp_name: 'Recognize that in a multi-digit number',
                  comp_student_desc: 'Place Value',
                  comp_seq: 29,
                  student_count: 53
                },
                {
                  comp_code: 'K12.MA-MA5-NOBT-A.01',
                  comp_display_code: '5.NBT.1',
                  comp_name: 'Recognize that in a multi-digit number',
                  comp_student_desc: 'Place Value',
                  comp_seq: 28,
                  student_count: 63
                }
              ]
            },
            {
              domain_id: 23,
              domain_name: 'Functions',
              domain_code: 'F',
              domain_seq: 12,
              competencies: [
                {
                  comp_code: 'K12.MA-MA5-NOBT-A.01',
                  comp_display_code: '5.NBT.1',
                  comp_name: 'Recognize that in a multi-digit number',
                  comp_student_desc: 'Place Value',
                  comp_seq: 29,
                  student_count: 23
                },
                {
                  comp_code: 'K12.MA-MA5-NOBT-A.01',
                  comp_display_code: '5.NBT.1',
                  comp_name: 'Recognize that in a multi-digit number',
                  comp_student_desc: 'Place Value',
                  comp_seq: 28,
                  student_count: 34
                }
              ]
            }
          ]
        },
        {
          grade_id: 378,
          grade: 'Grade 9',
          grade_Seq: 9,
          description: '',
          fw_code: 'CT',
          domains: [
            {
              domain_id: 20,
              domain_name: 'Expressions and Equations',
              domain_code: 'EE',
              domain_seq: 9,
              competencies: [
                {
                  comp_code: 'K12.MA-MA5-NOBT-A.01',
                  comp_display_code: '5.NBT.1',
                  comp_name: 'Recognize that in a multi-digit number',
                  comp_student_desc: 'Place Value',
                  comp_seq: 29,
                  student_count: 40
                },
                {
                  comp_code: 'K12.MA-MA5-NOBT-A.01',
                  comp_display_code: '5.NBT.1',
                  comp_name: 'Recognize that in a multi-digit number',
                  comp_student_desc: 'Place Value',
                  comp_seq: 28,
                  student_count: 45
                }
              ]
            },
            {
              domain_id: 23,
              domain_name: 'Functions',
              domain_code: 'F',
              domain_seq: 12,
              competencies: [
                {
                  comp_code: 'K12.MA-MA5-NOBT-A.01',
                  comp_display_code: '5.NBT.1',
                  comp_name: 'Recognize that in a multi-digit number',
                  comp_student_desc: 'Place Value',
                  comp_seq: 29,
                  student_count: 43
                },
                {
                  comp_code: 'K12.MA-MA5-NOBT-A.01',
                  comp_display_code: '5.NBT.1',
                  comp_name: 'Recognize that in a multi-digit number',
                  comp_student_desc: 'Place Value',
                  comp_seq: 28,
                  student_count: 44
                }
              ]
            }
          ]
        },
        {
          grade_id: 378,
          grade: 'Grade 9',
          grade_Seq: 9,
          description: '',
          fw_code: 'CT',
          domains: [
            {
              domain_id: 20,
              domain_name: 'Expressions and Equations',
              domain_code: 'EE',
              domain_seq: 9,
              competencies: [
                {
                  comp_code: 'K12.MA-MA5-NOBT-A.01',
                  comp_display_code: '5.NBT.1',
                  comp_name: 'Recognize that in a multi-digit number',
                  comp_student_desc: 'Place Value',
                  comp_seq: 29,
                  student_count: 40
                },
                {
                  comp_code: 'K12.MA-MA5-NOBT-A.01',
                  comp_display_code: '5.NBT.1',
                  comp_name: 'Recognize that in a multi-digit number',
                  comp_student_desc: 'Place Value',
                  comp_seq: 28,
                  student_count: 45
                }
              ]
            },
            {
              domain_id: 23,
              domain_name: 'Functions',
              domain_code: 'F',
              domain_seq: 12,
              competencies: [
                {
                  comp_code: 'K12.MA-MA5-NOBT-A.01',
                  comp_display_code: '5.NBT.1',
                  comp_name: 'Recognize that in a multi-digit number',
                  comp_student_desc: 'Place Value',
                  comp_seq: 29,
                  student_count: 43
                },
                {
                  comp_code: 'K12.MA-MA5-NOBT-A.01',
                  comp_display_code: '5.NBT.1',
                  comp_name: 'Recognize that in a multi-digit number',
                  comp_student_desc: 'Place Value',
                  comp_seq: 28,
                  student_count: 44
                }
              ]
            }
          ]
        }
      ]
    };
    let strugglingCompetency = payload.struggling_competencies
      ? payload.struggling_competencies
      : [];
    let strugglingCompetencyPayload = [];
    if (strugglingCompetency && strugglingCompetency.length) {
      strugglingCompetency.forEach(grade => {
        strugglingCompetencyPayload.pushObject(
          Ember.Object.create({
            gradeId: grade.grade_id,
            grade: grade.grade,
            gradeSeq: grade.grade_Seq,
            description: grade.description,
            fwCode: grade.fw_code,
            domains: serialize.normalizeDomain(grade.domains)
          })
        );
      });
    }
    return strugglingCompetencyPayload;
  },

  normalizeDomain(payload) {
    let domains = payload ? payload : null;
    let domainList = [];
    if (domains && domains.length) {
      domains.map(domain => {
        domainList.pushObject(
          Ember.Object.create({
            competencies: this.normalizeCompetency(domain.competencies),
            domainCode: domain.domain_code,
            domainId: domain.domain_id,
            domainName: domain.domain_name,
            domainSeq: domain.domain_seq
          })
        );
      });
    }
    return domainList;
  },

  normalizeCompetency(payload) {
    let competencies = payload ? payload : null;
    let competencyList = [];
    if (competencies && competencies.length) {
      competencies.map(competency => {
        competencyList.pushObject(
          Ember.Object.create({
            code: competency.comp_code,
            displayCode: competency.comp_display_code,
            name: competency.comp_name,
            sequence: competency.comp_seq,
            studentsDescription: competency.comp_student_desc,
            studentsCount: competency.student_count
          })
        );
      });
    }
    return competencyList.length
      ? competencyList.sortBy('studentsCount').reverse()
      : competencyList;
  },

  normalizeStudentsPerfomance(payload) {
    payload = {
      students: [
        {
          id: 'a976eeff-6b04-4688-ab51-f56d8cb84579',
          first_name: 'John',
          last_name: 'Dahl',
          display_name: 'johnd',
          thumbnail: 'a55cdcdb-c3c2-408a-b26c-fe101755ceae.png',
          username: 'johnd',
          performance: 45
        },
        {
          id: 'a976eeff-6b04-4688-ab51-f56d8cb84579',
          first_name: 'Arun',
          last_name: 'kumar',
          display_name: 'johnd',
          thumbnail: 'a55cdcdb-c3c2-408a-b26c-fe101755ceae.png',
          username: 'johnd',
          performance: 45
        },
        {
          id: 'a976eeff-6b04-4688-ab51-f56d8cb84579',
          first_name: 'Kumar',
          last_name: 'Dahl',
          display_name: 'johnd',
          thumbnail: 'a55cdcdb-c3c2-408a-b26c-fe101755ceae.png',
          username: 'johnd',
          performance: 45
        }
      ]
    };
    let students = payload.students ? payload.students : [];
    let studentsList = [];
    if (students && students.length) {
      students.forEach(student => {
        studentsList.pushObject(
          Ember.Object.create({
            id: student.id,
            firstName: student.first_name,
            lastName: student.last_name,
            displayName: student.display_name,
            thumbnail: student.thumbnail,
            username: student.username,
            performanceScore: student.performance
          })
        );
      });
    }
    return studentsList;
  }
});
